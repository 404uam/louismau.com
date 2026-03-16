import type { Project } from "@/types";

export const featuredProjects: Project[] = [
  {
    id: "project-1",
    name: "Realtime Analytics Dashboard",
    description:
      "Operational dashboard for high-throughput event streams with role-based access and alerting.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    github: "https://github.com/louismau/realtime-analytics-dashboard",
    live: "https://example.com/realtime-analytics-dashboard",
    year: 2025,
  },
  {
    id: "project-2",
    name: "Contract Workflow Platform",
    description:
      "Document workflow app with audit trails, reusable templates, and team approvals.",
    technologies: ["React", "TypeScript", "Node.js", "Prisma"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    github: "https://github.com/louismau/contract-workflow-platform",
    live: "https://example.com/contract-workflow-platform",
    year: 2024,
  },
  {
    id: "project-3",
    name: "Field Ops Mobile Suite",
    description:
      "Offline-first task management and sync engine for distributed field teams.",
    technologies: ["React Native", "Expo", "SQLite", "GraphQL"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    github: "https://github.com/louismau/field-ops-mobile-suite",
    year: 2024,
  },
  {
    id: "project-4",
    name: "Design System Toolkit",
    description:
      "Shared component system and docs for product teams, with accessibility guardrails built in.",
    technologies: ["Next.js", "Storybook", "Tailwind", "Playwright"],
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80",
    github: "https://github.com/louismau/design-system-toolkit",
    live: "https://example.com/design-system-toolkit",
    year: 2023,
  },
];
