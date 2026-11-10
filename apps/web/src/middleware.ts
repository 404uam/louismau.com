import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	let maintenanceMode = true;

	if (process.env.NODE_ENV === "development") {
		console.debug("running in dev mode, skipping maintenance mode check");
		maintenanceMode = false;
	}

	try {
		const { env } = getCloudflareContext();
		// Only an explicit opt-out opens the site; missing or invalid config stays closed.
		maintenanceMode =
			(await env.SITE_CONFIG.get("maintenance_mode")) !== "false";
	} catch {
		console.debug("Maintenance configuration unavailable;");
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
