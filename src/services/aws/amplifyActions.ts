import routes from "@/routes";
import { extractError, extractErrorMessage } from "@/utils/errors";
import { safeParse } from "@/utils/Parse";
import {
  fetchAuthSession,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  signIn,
  SignInOutput,
  signOut,
} from "@aws-amplify/auth";
import { redirect } from "next/navigation";

export async function handleSignIn(
  username: string,
  password: string
): Promise<SignInOutput> {
  try {
    const nextStep = await signIn({
      username: username,
      password: password,
    });
    return nextStep;
  } catch (e) {
    throw extractError(e);
  }
}

export async function handleSignOut() {
  try {
    await signOut({ global: true });
  } catch (error) {
    console.log(extractErrorMessage(error));
  }
  redirect(routes.LOGIN);
}

export async function signOutGlobal() {
  try {
    await signOut({ global: true });
  } catch (error) {
    console.log(extractErrorMessage(error));
  }
}

export const printAccessTokenAndIdToken = async () => {
  try {
    const session = await fetchAuthSession();

    return session.tokens?.accessToken.toString();
  } catch (e) {
    console.log(e);
  }
};

export const getHisaPersonId = (
  user: FetchUserAttributesOutput | undefined
) => {
  try {
    const coveredPerson = user?.["custom:covered_person"];

    if (coveredPerson) {
      const parsed = safeParse<{ hisaPersonId: string }>(coveredPerson || "");
      return parsed?.hisaPersonId;
    }
    return undefined;
  } catch (error) {
    console.error("Error parsing covered_person:", error);
    return undefined;
  }
};

export const getUserId = async () => {
  try {
    const user = await fetchUserAttributes();

    const hisaPersonId = getHisaPersonId(user);

    return hisaPersonId;
  } catch (e) {
    console.log(e);
  }
};

export const printIdToken = async () => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch (e) {
    return null;
  }
};
