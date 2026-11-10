# Agent guidance

This repository houses Louis Mau's personal website and related applications, showcasing photography, software projects, and professional experience.

- Keep exploration proportional to the task. Start with relevant files and targeted `rg` searches; scan the whole repository only when needed. Read large files in focused chunks and avoid generated output and dependencies.
- Treat source code, package manifests, lockfiles, and configuration as the source of truth. Inspect relevant scripts before running commands; use the package manager and working directory indicated by the project.
- Follow nearby conventions and reuse existing components and utilities. Keep changes focused; preserve accessibility and responsive behavior for UI work.
- Preserve unrelated user changes and untracked files. Avoid hand-editing generated files or committing credentials, local state, or build artifacts.
- Do not delete files or directories unless the user explicitly requests those deletions. Otherwise, pause, explain what would be removed and why, and ask for clarification and approval before deleting. Apply this rule to moves and renames that remove an existing path too.
- Validate in proportion to the change using relevant existing checks. Documentation-only edits do not require an application build. Report what ran, failures, and any unverified behavior.
- Keep communication concise: state the result, meaningful verification, and remaining blockers.
- Keep this file small and durable. Do not add task history, temporary issues, dependency versions, directory inventories, command catalogs, or implementation details that can be discovered from the repository. Update it only when enduring working conventions change.
