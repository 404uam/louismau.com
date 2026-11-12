export const resume = {
	name: "Louis Mau",
	title: "Senior Full-Stack Software Engineer",
	lastUpdated: "2026-11-06",
	summary:
		"Senior full-stack software engineer with 6+ years building distributed systems in fintech and logistics. Proven track record leading platform migrations, designing event-driven architectures, and delivering high-impact cross-functional technical leadership.",
	experience: [
		{
			role: "Software Engineer",
			company: "Neo Financial",
			location: "Calgary, AB",
			startDate: "2025-10",
			endDate: "2026-09",
			dates: "Oct 2025 – Sept 2026",
			highlights: [
				"Architected and delivered Neo’s Zendesk-to-Intercom customer support migration, building the support-platform-service orchestrator from scratch and enabling automated ticket creation for disputes, fraud alerts, high-risk account restrictions, and manual reviews across Intercom and Jira. Reduced cost to serve by 25% and increased operational efficiency by 30% by automating ticket creation in Jira.",
				"Led technical planning for the migration, decomposing cross-service epics into executable work across 6 engineers. Scoped email flows, Jira API migrations, dispute event publishing, and go-live monitoring, while personally delivering core infrastructure: SQS consumers, ticket orchestration, and multi-service event publishing.",
				"Implemented a PCI-compliant data pipeline in AWS to de-identify data and simulate real-world scenarios for developers. Used Terraform IaC and Python to extract MongoDB snapshots from production into locally runnable environments.",
			],
		},
		{
			role: "Software Engineer II",
			company: "Article",
			location: "Vancouver, BC",
			startDate: "2021-06",
			endDate: "2024-02",
			dates: "Jun 2021 – Feb 2024",
			highlights: [
				"Designed and implemented a five-phase project to expand the business’s carrier offerings, enabling a 35% reduction in extra fees and a 135% increase in carrier availability and flexibility.",
				"Migrated key team applications from a shared AWS account to a team-managed account with minimal downtime and zero issues, giving the team more autonomy and ownership over its applications.",
				"Built an order monitoring tool for internal stakeholders, replacing a spreadsheet-based workflow with a scalable tool for proactive work on orders. Used DynamoDB and Vue to serve and track monitored orders.",
			],
		},
		{
			role: "Software Engineer I & II",
			company: "Shareworks by Morgan Stanley",
			location: "Calgary, AB",
			startDate: "2019-06",
			endDate: "2021-06",
			dates: "Jun 2019 – Jun 2021",
			highlights: [
				"Designed and implemented a 10b5-1 tool that reduced plan enrollment time for users and plan administrators from 2–7 weeks to 5 minutes.",
				"Designed and built Leave of Absence and Full-Time Equivalent workflow automation, compressing a recurring 2–4-business-day monthly process into a 2-hour operational flow with only 30 minutes of manual stewardship.",
			],
		},
	],
	skills: [
		{
			category: "Languages",
			items:
				"Java, TypeScript, SQL (Oracle and MySQL), NoSQL (DynamoDB and MongoDB)",
		},
		{ category: "Frameworks", items: "React, Vue.js, Angular" },
		{ category: "Tooling", items: "Kafka, AWS, Terraform, GraphQL" },
	],
	education: [
		{
			program: "Computer Science",
			school: "University of British Columbia",
			location: "Vancouver, BC",
		},
		{
			program: "Computer Science",
			school: "Mount Royal University",
			location: "Calgary, AB",
		},
	],
} as const;
