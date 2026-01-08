import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { NextRequest } from "next/server";
import getAwsConfig from "./aws-exports";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: getAwsConfig(),
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);

        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
        };

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}

/**
 * Rewrite AWS Cognito cookies with user ID to ensure proper authentication flow
 * 
 * This function prevents cookie duplication and enforces size limits to avoid
 * "400 Bad Request - Request Header Or Cookie Too Large" errors.
 * 
 * Key improvements:
 * - Prevents cookie duplication through tracking
 * - Enforces 6KB size limit with fallback to essential cookies
 * - Preserves LastAuthUser and core authentication tokens
 * - Provides logging for debugging
 * 
 * @param request - Next.js request object
 * @returns Modified request with optimized cookies or null if not needed
 */
export function rewriteCognitoCookiesWithUserId(
  request: NextRequest
): { modifiedRequest: NextRequest; userId: string } | null {
  // Only run cookie rewriting in production to avoid development overhead
  if (process.env.NODE_ENV !== "production") return null;

  const clientId = getAwsConfig().Cognito.userPoolClientId;
  const lastUserKey = `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`;
  const userId = request.cookies.get(lastUserKey)?.value;

  // No user ID means no active session, skip rewriting
  if (!userId) return null;

  const updatedCookies: string[] = [];
  const cognitoPrefix = `CognitoIdentityServiceProvider.${clientId}.`;
  
  // Track processed cookies to prevent duplicates (main fix for cookie multiplication)
  const processedCookies = new Set<string>();

  // Process each cookie, handling Cognito cookies specially
  for (const { name, value } of request.cookies.getAll()) {
    // Skip if already processed (prevents duplicates)
    if (processedCookies.has(name)) continue;
    
    if (name.startsWith(cognitoPrefix)) {
      if (name.includes("LastAuthUser")) {
        // Always preserve LastAuthUser cookie as-is (required for auth flow)
        updatedCookies.push(`${name}=${value}`);
      } else if (!name.includes(`.${userId}.`)) {
        // Rewrite cookies without userId to include userId (main purpose of function)
        const keySuffix = name.substring(cognitoPrefix.length);
        const newName = `${cognitoPrefix}${userId}.${keySuffix}`;
        updatedCookies.push(`${newName}=${value}`);
      } else {
        // Keep properly formatted cookies as-is
        updatedCookies.push(`${name}=${value}`);
      }
    } else {
      // Preserve all non-Cognito cookies
      updatedCookies.push(`${name}=${value}`);
    }
    
    processedCookies.add(name);
  }

  // Check if cookie header exceeds safe size limit
  const newCookieHeader = updatedCookies.join("; ");
  const maxHeaderSize = 6144; // 6KB limit (server usually allows 8KB, leaving 2KB buffer)
  
  if (newCookieHeader.length > maxHeaderSize) {
    console.warn("Cookie header too large, keeping only essential Cognito cookies");
    
    // Emergency fallback: keep only essential cookies to prevent 400 error
    const essentialCookies = updatedCookies.filter(cookie => {
      const cookieName = cookie.split('=')[0];
      return cookieName.includes('LastAuthUser') || 
             cookieName.includes('accessToken') || 
             cookieName.includes('idToken') || 
             cookieName.includes('refreshToken') ||
             !cookieName.startsWith(cognitoPrefix); // Keep non-Cognito cookies
    });
    
    const essentialHeader = essentialCookies.join("; ");
    
    const modifiedRequest = new NextRequest(request.url, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        cookie: essentialHeader,
      },
      body: request.body,
      redirect: request.redirect,
    });

    return { modifiedRequest, userId };
  }

  // Normal case: cookie header is within safe limits
  const modifiedRequest = new NextRequest(request.url, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers.entries()),
      cookie: newCookieHeader,
    },
    body: request.body,
    redirect: request.redirect,
  });

  return { modifiedRequest, userId };
}
