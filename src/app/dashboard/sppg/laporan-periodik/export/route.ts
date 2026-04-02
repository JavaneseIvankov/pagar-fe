import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v3";
import { ApiDownloadError, createSppgReportExportHelper } from "@/lib/api";
import { getAuthToken } from "@/lib/auth/server";
import { env } from "@/lib/env/server";

function resolveExportFormat(
  format: null | string,
): "pdf" | "xlsx" | undefined {
  if (format === "pdf" || format === "xlsx") {
    return format;
  }

  return undefined;
}

export async function GET(request: NextRequest) {
  const helper = createSppgReportExportHelper({
    baseUrl: env.PAGAR_API_BASE_URL,
    getAuthToken,
  });

  try {
    const result = await helper.downloadSppgReportExport({
      query: {
        start_date: request.nextUrl.searchParams.get("start_date") ?? "",
        end_date: request.nextUrl.searchParams.get("end_date") ?? "",
        format: resolveExportFormat(request.nextUrl.searchParams.get("format")),
      },
    });

    return new NextResponse(result.blob, {
      headers: {
        "content-type": result.contentType ?? "application/pdf",
        ...(result.filename
          ? {
              "content-disposition": `attachment; filename="${result.filename}"`,
            }
          : {}),
      },
    });
  } catch (error) {
    if (error instanceof ApiDownloadError) {
      return new NextResponse(error.message, {
        status: error.status,
        headers: {
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }

    if (error instanceof ZodError) {
      return new NextResponse(
        "Parameter unduhan laporan periodik tidak valid.",
        {
          status: 400,
          headers: {
            "content-type": "text/plain; charset=utf-8",
          },
        },
      );
    }

    return new NextResponse("Gagal mengunduh laporan periodik.", {
      status: 500,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }
}
