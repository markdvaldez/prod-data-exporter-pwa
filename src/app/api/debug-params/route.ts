import { getCognitoConfig } from "@/services/aws/ssmCognitoConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const config = await getCognitoConfig();
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    console.error("DEBUG SSM ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
