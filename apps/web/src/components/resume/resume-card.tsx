import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";
import styles from "./resume-card.module.css";

type ResumeCardProps = {
	onClose?: () => void;
	className?: string;
	presentation?: "default" | "portfolio";
};

export default function ResumeCard({
	onClose,
	className,
	presentation = "default",
}: ResumeCardProps) {
	const updatedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(resume.lastUpdated));

	return (
		<Card
			className={cn(
				"flex min-h-0 flex-col overflow-hidden",
				presentation === "portfolio" && styles.portfolio,
				className,
			)}
		>
			{presentation === "default" ? (
				<CardHeader
					className={cn(
						"flex-row flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3",
						styles.header,
					)}
				>
					<div className="space-y-1">
						<h2
							id="maintenance-resume-title"
							className="text-sm font-semibold text-slate-900"
						>
							Resume
						</h2>
						<CardDescription className="text-xs">
							Last updated:{" "}
							<time dateTime={resume.lastUpdated}>{updatedDate}</time>
						</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						{onClose ? (
							<Button
								type="button"
								variant="ghost"
								onClick={onClose}
								className="min-h-11 rounded-md"
							>
								Close
							</Button>
						) : null}
					</div>
				</CardHeader>
			) : null}
			<CardContent
				tabIndex={0}
				aria-label="Resume content"
				className={cn(
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400",
					styles.content,
				)}
			>
				<article className={cn("text-sm text-slate-700", styles.document)}>
					<header className="space-y-2 border-b border-slate-200 pb-6">
						<h3 className="text-3xl font-semibold tracking-tight text-slate-950">
							{resume.name}
						</h3>
						<p className="font-medium text-slate-600">{resume.title}</p>
						{presentation === "portfolio" ? (
							<p className="text-xs text-slate-500">
								Last updated:{" "}
								<time dateTime={resume.lastUpdated}>{updatedDate}</time>
							</p>
						) : null}
					</header>

					<section aria-labelledby="resume-summary" className="space-y-3">
						<h3
							id="resume-summary"
							className="text-xs font-semibold tracking-widest text-slate-900 uppercase"
						>
							Summary
						</h3>
						<p>{resume.summary}</p>
					</section>

					<section aria-labelledby="resume-experience" className="space-y-5">
						<h3
							id="resume-experience"
							className="text-xs font-semibold tracking-widest text-slate-900 uppercase"
						>
							Professional experience
						</h3>
						{resume.experience.map((job) => (
							<section
								key={job.company}
								aria-label={`${job.role} at ${job.company}`}
								className="space-y-3"
							>
								<div className="flex flex-col gap-1">
									<h4 className="text-base font-semibold text-slate-950">
										{job.role}
									</h4>
									<p className="font-medium text-slate-700">
										{job.company}{" "}
										<span className="font-normal text-slate-500">
											· {job.location}
										</span>
									</p>
									<p className="text-xs text-slate-500">
										<time dateTime={job.startDate}>
											{job.dates.split(" – ")[0]}
										</time>
										{" – "}
										<time dateTime={job.endDate}>
											{job.dates.split(" – ")[1]}
										</time>
									</p>
								</div>
								<ul className={styles.highlights}>
									{job.highlights.map((highlight) => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
							</section>
						))}
					</section>

					<section aria-labelledby="resume-skills" className="space-y-3">
						<h3
							id="resume-skills"
							className="text-xs font-semibold tracking-widest text-slate-900 uppercase"
						>
							Skills
						</h3>
						<dl className="space-y-2">
							{resume.skills.map((skill) => (
								<div key={skill.category}>
									<dt className="inline font-semibold text-slate-900">
										{skill.category}:{" "}
									</dt>
									<dd className="inline">{skill.items}</dd>
								</div>
							))}
						</dl>
					</section>

					<section aria-labelledby="resume-education" className="space-y-3">
						<h3
							id="resume-education"
							className="text-xs font-semibold tracking-widest text-slate-900 uppercase"
						>
							Education
						</h3>
						{resume.education.map((education) => (
							<div key={`${education.school}-${education.program}`}>
								<h4 className="font-semibold text-slate-950">
									{education.program}
								</h4>
								<p>{education.school}</p>
								<p className="text-slate-500">{education.location}</p>
							</div>
						))}
					</section>
				</article>
			</CardContent>
		</Card>
	);
}
