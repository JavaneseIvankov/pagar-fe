import type { z } from "zod/v3";

import { apiContract, type ApiContract } from "./api-contract";
import {
  API_REQUEST_FAILED_MESSAGE,
  API_RESPONSE_INVALID_MESSAGE,
  AUTH_SESSION_EXPIRED_MESSAGE,
} from "./error-messages";
import { parseWithMonitoring } from "./parse-with-monitoring";

type AnySchema = z.ZodTypeAny;
export type ApiEndpointName = keyof ApiContract;
type EndpointName = ApiEndpointName;
type EndpointDefinition<Name extends EndpointName> = ApiContract[Name];
type MaybePromise<T> = T | Promise<T>;
type SchemaInput<T> = T extends AnySchema ? z.input<T> : never;
type SchemaOutput<T> = T extends AnySchema ? z.output<T> : never;

type MultipartFile = Blob;
type MultipartFiles = Record<
  string,
  MultipartFile | MultipartFile[] | null | undefined
>;

export interface ApiClientHeadersLike {
  get(name: string): string | null;
}

export interface ApiClientResponseLike {
  ok: boolean;
  status: number;
  headers: ApiClientHeadersLike;
  text(): Promise<string>;
}

export type ApiClientHeaderRecord = Record<string, string>;

export interface ApiClientFetchInit {
  method: string;
  headers?: ApiClientHeaderRecord;
  body?: BodyInit;
  signal?: AbortSignal;
}

export type ApiClientFetcher = (
  input: string,
  init: ApiClientFetchInit,
) => MaybePromise<ApiClientResponseLike>;

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

export type ApiClientParsedRequest<Name extends EndpointName> = {
  params: SchemaOutput<EndpointDefinition<Name>["params"]>;
  query: SchemaOutput<EndpointDefinition<Name>["query"]>;
} & (EndpointDefinition<Name> extends { body: infer Body extends AnySchema }
  ? { body: SchemaOutput<Body> }
  : { body?: undefined }) &
  (EndpointDefinition<Name> extends { requestFormat: "multipart/form-data" }
    ? { files?: MultipartFiles }
    : { files?: undefined });

export interface ApiClientRequestHookContext<
  Name extends EndpointName = EndpointName,
> {
  endpoint: Name;
  contract: ApiContract[Name];
  request: ApiClientRequest<Name>;
  parsed: ApiClientParsedRequest<Name>;
  url: string;
  headers: ApiClientHeaderRecord;
  init: ApiClientFetchInit;
}

export interface ApiClientResponseHookContext<
  Name extends EndpointName = EndpointName,
> extends ApiClientRequestHookContext<Name> {
  response: ApiClientResponseLike;
  payload: unknown;
}

export interface ApiClientErrorHookContext<
  Name extends EndpointName = EndpointName,
> extends ApiClientRequestHookContext<Name> {
  error: unknown;
  response?: ApiClientResponseLike;
  payload?: unknown;
}

export interface ApiClientHooks {
  onRequest?<Name extends EndpointName>(
    context: ApiClientRequestHookContext<Name>,
  ): MaybePromise<void>;
  onResponse?<Name extends EndpointName>(
    context: ApiClientResponseHookContext<Name>,
  ): MaybePromise<void>;
  onError?<Name extends EndpointName>(
    context: ApiClientErrorHookContext<Name>,
  ): MaybePromise<void>;
}

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
  fetch?: ApiClientFetcher;
  getAuthToken?: () => MaybePromise<string | null | undefined>;
  getHeaders?: () => MaybePromise<HeadersInit | undefined>;
  hooks?: ApiClientHooks;
}

export class ApiClientError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | undefined;
  readonly endpoint: EndpointName;
  readonly code: "auth_expired" | "request_failed";
  readonly response: ApiClientResponseLike;

  constructor(
    message: string,
    options: {
      status: number;
      data: T | undefined;
      endpoint: EndpointName;
      code: "auth_expired" | "request_failed";
      response: ApiClientResponseLike;
    },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.data = options.data;
    this.endpoint = options.endpoint;
    this.code = options.code;
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

async function readResponsePayload(response: ApiClientResponseLike) {
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

function hasExpiredTokenMessage(payload: unknown) {
  return (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    payload.message === "Invalid or expired token."
  );
}

function isExpiredTokenResponse(
  payload: unknown,
  status: number,
  isProtected: boolean,
) {
  if (!isProtected) {
    return false;
  }

  return status === 401 || (status === 403 && hasExpiredTokenMessage(payload));
}

function getErrorMessage(
  payload: unknown,
  status: number,
  isProtected: boolean,
) {
  if (isExpiredTokenResponse(payload, status, isProtected)) {
    return AUTH_SESSION_EXPIRED_MESSAGE;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return API_REQUEST_FAILED_MESSAGE;
}

function createParsedRequest<Name extends EndpointName>(
  endpoint: EndpointDefinition<Name>,
  requestWithInternals: ApiClientRequest<Name> & {
    body?: unknown;
    files?: MultipartFiles;
  },
): ApiClientParsedRequest<Name> {
  const params = endpoint.params.parse(requestWithInternals.params ?? {});
  const query = endpoint.query.parse(requestWithInternals.query ?? {});
  const body =
    "body" in endpoint
      ? endpoint.body.parse(requestWithInternals.body ?? {})
      : undefined;

  return {
    params,
    query,
    ...(body !== undefined ? { body } : {}),
    ...(endpoint.requestFormat === "multipart/form-data"
      ? { files: requestWithInternals.files }
      : {}),
  } as ApiClientParsedRequest<Name>;
}

async function resolveHeaders<Name extends EndpointName>(
  endpoint: EndpointDefinition<Name>,
  request: ApiClientRequest<Name>,
  options: CreateApiClientOptions,
) {
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

  return mergedHeaders;
}

function buildRequestUrl<Name extends EndpointName>(
  baseUrl: string,
  endpoint: EndpointDefinition<Name>,
  params: ApiClientParsedRequest<Name>["params"],
  query: ApiClientParsedRequest<Name>["query"],
) {
  const path = endpoint.buildPath(
    params as Record<string, string | number | boolean>,
  );
  const url = new URL(`${baseUrl}${path}`);

  for (const [key, value] of Object.entries(query)) {
    appendQueryValue(url.searchParams, key, value);
  }

  return url.toString();
}

function buildRequestBody<Name extends EndpointName>(
  endpoint: EndpointDefinition<Name>,
  parsed: ApiClientParsedRequest<Name>,
  headers: ApiClientHeaderRecord,
) {
  if (endpoint.requestFormat === "multipart/form-data") {
    delete headers["content-type"];

    return createMultipartBody(
      ((parsed as { body?: Record<string, unknown> }).body ?? {}) as Record<
        string,
        unknown
      >,
      (parsed as { files?: MultipartFiles }).files,
    );
  }

  if ("body" in endpoint) {
    if (!headers["content-type"]) {
      headers["content-type"] = "application/json";
    }

    return JSON.stringify((parsed as { body?: unknown }).body);
  }

  return undefined;
}

function normalizeHookHeaders<Name extends EndpointName>(
  context: ApiClientRequestHookContext<Name>,
) {
  const headers = toHeaderRecord(context.init.headers);

  context.headers = headers;
  context.init.headers = headers;
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
    const parsed = createParsedRequest(endpoint, requestWithInternals);
    const headers = await resolveHeaders(endpoint, request, options);
    const init: ApiClientFetchInit = {
      method: endpoint.method.toUpperCase(),
      headers,
      body: buildRequestBody(endpoint, parsed, headers),
      signal: request.signal,
    };
    const requestContext: ApiClientRequestHookContext<Name> = {
      endpoint: name,
      contract: endpoint,
      request,
      parsed,
      url: buildRequestUrl(baseUrl, endpoint, parsed.params, parsed.query),
      headers,
      init,
    };

    await options.hooks?.onRequest?.(requestContext);
    normalizeHookHeaders(requestContext);

    if ("headers" in endpoint) {
      endpoint.headers.parse(requestContext.headers);
    }

    let response: ApiClientResponseLike;

    try {
      response = await fetchImpl(requestContext.url, requestContext.init);
    } catch (error) {
      await options.hooks?.onError?.({
        ...requestContext,
        error,
      });
      throw error;
    }

    let payload: unknown;

    try {
      payload = await readResponsePayload(response);
    } catch (error) {
      await options.hooks?.onError?.({
        ...requestContext,
        error,
        response,
      });
      throw error;
    }

    await options.hooks?.onResponse?.({
      ...requestContext,
      response,
      payload,
    });

    if (response.ok) {
      return parseWithMonitoring({
        schema: endpoint.successResponse,
        payload,
        operation: `api:${String(name)}:success-response`,
        publicMessage: API_RESPONSE_INVALID_MESSAGE,
        metadata: {
          endpoint: String(name),
          status: response.status,
        },
      }) as ApiClientSuccess<Name>;
    }

    const parsedError = endpoint.errorResponse.safeParse(payload);
    const errorData = parsedError.success
      ? (parsedError.data as ApiClientErrorData<Name>)
      : (payload as ApiClientErrorData<Name> | undefined);
    const error = new ApiClientError<ApiClientErrorData<Name>>(
      getErrorMessage(payload, response.status, "headers" in endpoint),
      {
        status: response.status,
        data: errorData,
        endpoint: name,
        code: isExpiredTokenResponse(
          payload,
          response.status,
          "headers" in endpoint,
        )
          ? "auth_expired"
          : "request_failed",
        response,
      },
    );

    await options.hooks?.onError?.({
      ...requestContext,
      error,
      response,
      payload,
    });

    throw error;
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
