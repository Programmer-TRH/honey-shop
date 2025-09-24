import { ActionResponse } from "@/types/action-response";
import { AppError } from "@/types/errors";

export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    isAction?: boolean;
    isRoute?: boolean;
    successMessage?: string;
  } = {}
) {
  return (async (...args: Parameters<T>): Promise<any> => {
    try {
      const result = await fn(...args);

      // Wrap successful response for actions
      if (options.isAction) {
        return {
          success: true,
          message: options.successMessage
            ? options.successMessage
            : "Action completed successfully",
          data: result,
        } as ActionResponse<typeof result>;
      }

      // For route handlers, just return the raw result (NextResponse must be returned inside fn)
      return result;
    } catch (err) {
      console.error("Error captured:", err);

      if (options.isAction) {
        if (err instanceof AppError) {
          return {
            success: false,
            message: err.message,
            code: err.code,
          } as ActionResponse;
        }
        return {
          success: false,
          message: "Something went wrong",
        } as ActionResponse;
      }

      if (options.isRoute) {
        const { NextResponse } = await import("next/server");
        if (err instanceof AppError) {
          return NextResponse.json(
            { success: false, code: err.code, message: err.message },
            { status: err.statusCode }
          );
        }
        return NextResponse.json(
          { success: false, message: "Internal server error" },
          { status: 500 }
        );
      }

      throw err;
    }
  }) as T;
}
