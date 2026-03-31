import type { z } from "zod/v3";

import { apiContract, type ApiContract } from "./api-contract";

type AnySchema = z.ZodTypeAny;
type EndpointName = keyof ApiContract;
type EndpointDefinition<Name extends EndpointName> = ApiContract[Name];
type MaybePromise<T> = T | Promise<T>;
type SchemaInput<T> = T extends AnySchema ? z.input<T> : never;
type SchemaOutput<T> = T extends AnySchema ? z.output<T> : never;

type MultipartFile = Blob;
type MultipartFiles = Record<
  string,
  MultipartFile | MultipartFile[] | null | undefined
>;

export type ApiClientRequest<Name extends EndpointName> = {
  params?: SchemaInput<EndpointDefinition<Name>["params"]>;
  query?: SchemaInput<EndpointDefinition<Name>["query"]>;
  headers?: HeadersInit;
  signal?: AbortSignal;
} & (EndpointDefinition<Name> extends { body: infer Body extends AnySchema }
  ? { body?: SchemaInput<Body> }
  : unknown) &
  (EndpointDefinition<Name> extends { requestFormat: "multipart/form-data" }
    ? { files?: MultipartFiles }
    : unknown);

export type ApiClientSuccess<Name extends EndpointName> = SchemaOutput<
  EndpointDefinition<Name>["successResponse"]
>;

export type ApiClientErrorData<Name extends EndpointName> = SchemaOutput<
  EndpointDefinition<Name>["errorResponse"]
>;

export type ApiClientMethods = {
  [Name in EndpointName]: (
    request?: ApiClientRequest<Name>,
  ) => Promise<ApiClientSuccess<Name>>;
};

export type ApiClient = ApiClientMethods & {
  contract: ApiContract;
  request: <Name extends EndpointName>(
    name: Name,
    request?: ApiClientRequest<Name>,
  ) => Promise<ApiClientSuccess<Name>>;
};

export interface CreateApiClientOptions {
  baseUrl: string;
  fetch?: typeof fetch;
  getAuthToken?: () => MaybePromise<string | null | undefined>;
  getHeaders?: () => MaybePromise<HeadersInit | undefined>;
}

export class ApiClientError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | undefined;
  readonly endpoint: EndpointName;
  readonly response: Response;

  constructor(
    message: string,
    options: {
      status: number;
      data: T | undefined;
      endpoint: EndpointName;
      response: Response;
    },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.data = options.data;
    this.endpoint = options.endpoint;
    this.response = options.response;
  }
}

function normalizeBaseUrl(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

  if (!normalizedBaseUrl) {
    throw new Error("createApiClient requires a non-empty `baseUrl` option.");
  }

  return normalizedBaseUrl;
}

function toHeaderRecord(headers?: HeadersInit) {
  const record: Record<string, string> = {};

  if (!headers) {
    return record;
  }

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      record[key.toLowerCase()] = value;
    });
    return record;
  }

  if (Array.isArray(headers)) {
    for (const [key, value] of headers) {
      record[key.toLowerCase()] = value;
    }
    return record;
  }

  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      record[key.toLowerCase()] = String(value);
    }
  }

  return record;
}

function appendQueryValue(
  searchParams: URLSearchParams,
  key: string,
  value: unknown,
) {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendQueryValue(searchParams, key, item);
    }
    return;
  }

  if (value instanceof Date) {
    searchParams.append(key, value.toISOString());
    return;
  }

  if (typeof value === "object") {
    searchParams.append(key, JSON.stringify(value));
    return;
  }

  searchParams.append(key, String(value));
}

function appendFormValue(formData: FormData, key: string, value: unknown) {
  if (value === undefined || value === null) {
    return;
  }

  if (value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (value instanceof Date) {
    formData.append(key, value.toISOString());
    return;
  }

  if (typeof value === "object") {
    formData.append(key, JSON.stringify(value));
    return;
  }

  formData.append(key, String(value));
}

function appendMultipartFile(formData: FormData, key: string, value: unknown) {
  if (!(value instanceof Blob)) {
    throw new TypeError(`Expected Blob for multipart file field "${key}".`);
  }

  formData.append(key, value);
}

function createMultipartBody(
  body: Record<string, unknown>,
  files: MultipartFiles | undefined,
) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    appendFormValue(formData, key, value);
  }

  for (const [key, value] of Object.entries(files ?? {})) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const file of value) {
        appendMultipartFile(formData, key, file);
      }
      continue;
    }

    appendMultipartFile(formData, key, value);
  }

  return formData;
}

async function readResponsePayload(response: Response) {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(payload: unknown, status: number) {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return `Request failed with status ${status}.`;
}

export function createApiClient(options: CreateApiClientOptions): ApiClient {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetchImpl = options.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new Error(
      "No fetch implementation available. Pass `fetch` in createApiClient options.",
    );
  }

  async function executeRequest<Name extends EndpointName>(
    name: Name,
    request: ApiClientRequest<Name> = {} as ApiClientRequest<Name>,
  ): Promise<ApiClientSuccess<Name>> {
    const endpoint = apiContract[name];
    const requestWithInternals = request as ApiClientRequest<Name> & {
      body?: unknown;
      files?: MultipartFiles;
    };
    const params = endpoint.params.parse(request.params ?? {});
    const query = endpoint.query.parse(request.query ?? {});
    const body =
      "body" in endpoint
        ? endpoint.body.parse(requestWithInternals.body ?? {})
        : undefined;

    const defaultHeaders = toHeaderRecord(await options.getHeaders?.());
    const requestHeaders = toHeaderRecord(request.headers);
    const mergedHeaders = { ...defaultHeaders, ...requestHeaders };

    if ("headers" in endpoint) {
      // Caller-supplied Authorization wins over default headers and token injection.
      if (!mergedHeaders.authorization && options.getAuthToken) {
        const token = await options.getAuthToken();

        if (token) {
          mergedHeaders.authorization = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;
        }
      }

      endpoint.headers.parse(mergedHeaders);
    }

    const path = endpoint.buildPath(
      params as Record<string, string | number | boolean>,
    );
    const url = new URL(`${baseUrl}${path}`);

    for (const [key, value] of Object.entries(query)) {
      appendQueryValue(url.searchParams, key, value);
    }

    let requestBody: BodyInit | undefined;

    if (endpoint.requestFormat === "multipart/form-data") {
      requestBody = createMultipartBody(
        (body ?? {}) as Record<string, unknown>,
        requestWithInternals.files,
      );
      delete mergedHeaders["content-type"];
    } else if ("body" in endpoint) {
      requestBody = JSON.stringify(body);

      if (!mergedHeaders["content-type"]) {
        mergedHeaders["content-type"] = "application/json";
      }
    }

    const response = await fetchImpl(url.toString(), {
      method: endpoint.method.toUpperCase(),
      headers: mergedHeaders,
      body: requestBody,
      signal: request.signal,
    });
    const payload = await readResponsePayload(response);

    if (response.ok) {
      return endpoint.successResponse.parse(payload) as ApiClientSuccess<Name>;
    }

    const parsedError = endpoint.errorResponse.safeParse(payload);
    const errorData = parsedError.success
      ? (parsedError.data as ApiClientErrorData<Name>)
      : (payload as ApiClientErrorData<Name> | undefined);

    throw new ApiClientError<ApiClientErrorData<Name>>(
      getErrorMessage(payload, response.status),
      {
        status: response.status,
        data: errorData,
        endpoint: name,
        response,
      },
    );
  }

  const methods = Object.fromEntries(
    (Object.keys(apiContract) as EndpointName[]).map((name) => [
      name,
      (request?: ApiClientRequest<EndpointName>) =>
        executeRequest(name, request as ApiClientRequest<typeof name>),
    ]),
  ) as ApiClientMethods;

  return {
    contract: apiContract,
    request: executeRequest,
    ...methods,
  };
}
