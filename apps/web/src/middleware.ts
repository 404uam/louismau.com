import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	let maintenanceMode = true;

	try {
		const { env } = getCloudflareContext();
		// Only an explicit opt-out opens the site; missing or invalid config stays closed.
		maintenanceMode =
			(await env.SITE_CONFIG.get("maintenance_mode")) !== "false";
	} catch {
		console.error(
			"Maintenance configuration unavailable; showing maintenance page.",
		);
	}

	if (maintenanceMode) {
		const url = request.nextUrl.clone();
		url.pathname = "/maintenance";
		return NextResponse.rewrite(url, {
			status: 503,
			headers: {
				"Cache-Control": "no-store",
				"Retry-After": "300",
			},
		});
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/.*|maintenance|favicon.ico|.*\\..*).*)"],
};
