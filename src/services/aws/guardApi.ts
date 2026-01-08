/**
 * API Route Guard Utility
 * 
 * Simple utility for protecting API routes with basic error handling
 */

import { NextRequest, NextResponse } from "next/server";

export type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

/**
 * Guard API utility that wraps API handlers with basic error handling
 * This is a simplified version of the trainer-app guardApi utility
 */
export function guardApi(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Basic request validation could go here
      return await handler(request);
    } catch (error) {
      console.error("API Error:", error);
      
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "An unexpected error occurred",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };
}