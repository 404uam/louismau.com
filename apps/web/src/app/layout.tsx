import {
	Instrument_Sans,
	JetBrains_Mono,
	Source_Code_Pro,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SidebarProvider } from "@/components/portfolio/sidebar-state";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

const instrumentSans = Instrument_Sans({
	variable: "--font-instrument-sans",
	subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
	variable: "--font-source-code-pro",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-scroll-behavior="smooth"
			suppressHydrationWarning
			className={cn("font-mono", jetbrainsMono.variable)}
		>
			<body
				className={`${instrumentSans.variable} ${sourceCodePro.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>{children}</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
