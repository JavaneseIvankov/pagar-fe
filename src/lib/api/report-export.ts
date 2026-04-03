import { z } from "zod/v3";

type MaybePromise<T> = T | Promise<T>;
type DownloadFetcher = (
  input: string,
  init?: RequestInit,
) => MaybePromise<Response>;

const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const exportQuerySchema = z.object({
  start_date: dateOnlySchema,
  end_date: dateOnlySchema,
  format: z.enum(["pdf", "xlsx"]).optional().default("xlsx"),
});

export interface CreateSppgReportExportHelperOptions {
  baseUrl: string;
  fetch?: DownloadFetcher;
  getAuthToken?: () => MaybePromise<string | null | undefined>;
  getHeaders?: () => MaybePromise<HeadersInit | undefined>;
}

export interface DownloadSppgReportExportRequest {
  query: z.input<typeof exportQuerySchema>;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface SppgReportExportDownload {
  blob: Blob;
  contentType: string | null;
  filename: string | null;
}

export class ApiDownloadError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | undefined;
  readonly response: Response;

  constructor(
    message: string,
    options: {
      status: number;
      data: T | undefined;
      response: Response;
    },
  ) {
    super(message);
    this.name = "ApiDownloadError";
    this.status = options.status;
    this.data = options.data;
    this.response = options.response;
  }
}

function normalizeBaseUrl(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

  if (!normalizedBaseUrl) {
    throw new Error(
      "createSppgReportExportHelper requires a non-empty `baseUrl` option.",
    );
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

function parseErrorPayload(text: string) {
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function parseFilename(contentDisposition: string | null) {
  if (!contentDisposition) {
    return null;
  }

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition);

  if (utf8Match) {
    return decodeURIComponent(utf8Match[1]);
  }

  const filenameMatch = /filename="?([^"]+)"?/i.exec(contentDisposition);

  return filenameMatch ? filenameMatch[1] : null;
}

export function createSppgReportExportHelper(
  options: CreateSppgReportExportHelperOptions,
) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetchImpl = options.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new Error(
      "No fetch implementation available. Pass `fetch` in createSppgReportExportHelper options.",
    );
  }

  return {
    async downloadSppgReportExport(
      request: DownloadSppgReportExportRequest,
    ): Promise<SppgReportExportDownload> {
      const query = exportQuerySchema.parse(request.query);
      const headers = {
        ...toHeaderRecord(await options.getHeaders?.()),
        ...toHeaderRecord(request.headers),
      };

      if (!headers.authorization) {
        const authToken = await options.getAuthToken?.();

        if (authToken) {
          headers.authorization = authToken.startsWith("Bearer ")
            ? authToken
            : `Bearer ${authToken}`;
        }
      }

      const url = new URL(`${baseUrl}/pagar/v1/sppg/reports/export`);

      url.searchParams.set("start_date", query.start_date);
      url.searchParams.set("end_date", query.end_date);
      url.searchParams.set("format", query.format);

      const response = await fetchImpl(url.toString(), {
        method: "GET",
        headers,
        signal: request.signal,
      });

      if (!response.ok) {
        const text = await response.text();
        const payload = parseErrorPayload(text);

        throw new ApiDownloadError(getErrorMessage(payload, response.status), {
          status: response.status,
          data: payload,
          response,
        });
      }

      return {
        blob: await response.blob(),
        contentType: response.headers.get("content-type"),
        filename: parseFilename(response.headers.get("content-disposition")),
      };
    },
  };
}
