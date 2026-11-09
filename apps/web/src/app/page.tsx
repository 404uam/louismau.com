import { Button } from "@/components/ui/button";
import { EMAIL_URL } from "@/consts";

export default function Home() {
	return (
		<main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center gap-4 px-6 py-12">
			<h1 className="text-4xl font-semibold tracking-tight">Louis Mau</h1>
			<p className="text-muted-foreground">A new portfolio is in progress.</p>
			<Button asChild variant="outline" className="min-h-11">
				<a href={EMAIL_URL}>Email me</a>
			</Button>
		</main>
	);
}
