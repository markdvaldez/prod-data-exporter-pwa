import { includes } from "lodash";
import { z } from "zod/v4";

export const RequestErrorSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
  description: z.string().optional(),
  code: z.union([z.number(), z.string()]).optional(),
  status: z.number().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  detail: z.string().optional(),
  traceId: z.string().optional(),
  stack: z.string().optional(),
});

export type RequestErrorType = z.infer<typeof RequestErrorSchema>;

export class RequestError extends Error {
  description?: string;
  code?: number | string;
  type: string;
  title?: string;
  detail?: string;
  traceId?: string;

  constructor(errorData: RequestErrorType) {
    super(errorData?.description || "");
    const parsedData = RequestErrorSchema.parse(errorData);

    this.description =
      parsedData.title || parsedData.description || parsedData.message;
    this.code = parsedData.status || parsedData.code;
    this.title =
      parsedData.title || parsedData.description || parsedData.message;
    this.type = parsedData.type || "Request Error";
    this.detail = parsedData.detail;
    this.message = parsedData.message || parsedData.description || "";
    this.name =
      parsedData.name || parsedData.message || parsedData.description || "";
    this.traceId = parsedData.traceId;
  }
}

export function extractError(e: unknown): RequestErrorType {
  const defaultMessage = "error";
  const parsedError = RequestErrorSchema.safeParse(e);

  if (!parsedError.success) {
    return { message: defaultMessage, code: -3 };
  }
  const { data } = parsedError;
  const message =
    data.description || data.message || data.title || defaultMessage;

  const nextError: RequestErrorType = {
    ...data,
    message,
    code: data.code || data.status || -3,
  };

  if (data.traceId) {
    nextError.traceId = data.traceId;
  }

  if (/json[\s|.]parse/i.test(message) || data.title) {
    nextError.message = data.description || data.title || defaultMessage;
    return nextError;
  }

  const status = data.status || data.code;

  if (
    includes(
      [400, 401, 403, 404, 405, 408, 409, 429, 600, 501, 502, 503, 504],
      status
    )
  ) {
    return {
      ...nextError,
      message: `Request failed with status code ${status}`,
    };
  }

  const networkErrorKeywords = ["network error", "occurred", "networkerror"];

  if (
    networkErrorKeywords.some((keyword) =>
      nextError.message?.toLowerCase().includes(keyword)
    )
  ) {
    return {
      ...nextError,
      message: "No internet connection. Please reconnect and try again.",
    };
  }

  return nextError;
}

export function extractErrorMessage(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }

  if (e && typeof e === "object") {
  }

  if (typeof e === "string") {
    return e;
  }

  return "error";
}
