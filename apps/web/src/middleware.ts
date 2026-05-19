import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const maintenanceMode = await env.SITE_CONFIG.get("maintenance_mode");

  if (maintenanceMode === "true") {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/.*|maintenance|favicon.ico|.*\\..*).*)"],
};
