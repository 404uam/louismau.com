import type { Metadata } from "next";
import MaintenancePage from "@/components/maintenance/maintenance-page";

export const metadata: Metadata = {
	title: "Maintenance | Louis Mau",
	description: "This site is temporarily unavailable. Please check back soon.",
	robots: { index: false, follow: false },
};

export default function Page() {
	return <MaintenancePage />;
}
