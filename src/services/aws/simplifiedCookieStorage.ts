import { CookieStorage } from "aws-amplify/utils";
import JsCookie from "js-cookie";
import _ from "lodash";

class SimplifiedCookieStorage extends CookieStorage {
  private clientId: string;

  constructor(data: any = {}) {
    super(data);
    this.clientId = data.clientId;
  }

  private simplifyKey(key: string) {
    return key.replace(
      new RegExp(
        `^CognitoIdentityServiceProvider\\.${this.clientId}\\.([^\\.]+)\\.`
      ),
      `CognitoIdentityServiceProvider.${this.clientId}.`
    );
  }

  private getCookieOptions() {
    const { domain, path, expires, secure, sameSite } = this;
    return {
      path,
      expires,
      domain,
      secure,
      ...(sameSite && { sameSite }),
    };
  }

  async setItem(key: string, value: string) {
    JsCookie.set(this.simplifyKey(key), value, this.getCookieOptions());
  }

  async getItem(key: string) {
    return JsCookie.get(this.simplifyKey(key)) ?? null;
  }

  async removeItem(key: string) {
    JsCookie.remove(this.simplifyKey(key), this.getCookieOptions());
  }

  async clear() {
    const cookies = JsCookie.get();
    const keys = Object.keys(cookies).filter((key) =>
      key.startsWith(`CognitoIdentityServiceProvider.${this.clientId}.`)
    );
    await Promise.all(
      keys.map((key) => JsCookie.remove(key, this.getCookieOptions()))
    );
  }
}

export { SimplifiedCookieStorage };

export const clearAllCookies = async () => {
  try {
    const cookies = JsCookie.get();
    const keys = _.keys(cookies);
    await Promise.all(
      _.map(keys, (key) => JsCookie.remove(key, { path: "/" }))
    );
  } catch (error) {
    console.error("Error clearing cookies:", error);
  }
};

/**
 * Clear stale AWS Cognito cookies to prevent header size issues
 * 
 * This function removes outdated or malformed Cognito authentication cookies
 * while preserving the current user's active session cookies.
 * 
 * @param clientId - AWS Cognito User Pool Client ID
 * @param keepUserId - Optional user ID to preserve cookies for
 */
export const clearStaleCognitoCookies = async (clientId: string, keepUserId?: string) => {
  try {
    const cookies = JsCookie.get();
    const cognitoPrefix = `CognitoIdentityServiceProvider.${clientId}.`;
    
    const staleCookies = Object.keys(cookies).filter(key => {
      if (!key.startsWith(cognitoPrefix)) return false;
      
      // Keep LastAuthUser cookie
      if (key.includes('LastAuthUser')) return false;
      
      // If we have a userId to keep, don't delete those cookies
      if (keepUserId && key.includes(`.${keepUserId}.`)) return false;
      
      // Delete cookies for other users or malformed cookies
      return true;
    });
    
    await Promise.all(
      staleCookies.map(key => JsCookie.remove(key, { path: "/" }))
    );
    
    console.log(`Cleared ${staleCookies.length} stale Cognito cookies`);
  } catch (error) {
    console.error("Error clearing stale Cognito cookies:", error);
  }
};

/**
 * Calculate the current cookie header size in bytes
 * 
 * This helps monitor cookie header size to prevent "Request Header Too Large" errors.
 * Server limits are typically around 8KB, so we warn at 6KB.
 * 
 * @returns Cookie header size in bytes
 */
export const getCookieHeaderSize = () => {
  try {
    const cookies = JsCookie.get();
    const cookieHeader = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
    return cookieHeader.length;
  } catch (error) {
    console.error("Error calculating cookie header size:", error);
    return 0;
  }
};
