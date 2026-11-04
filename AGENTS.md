# European history atlas project facts

- This checkout is the actual atlas repository. GitHub: https://github.com/xiongyi1990/european-history-map.
- Existing Sites identity is authoritative in `.openai/hosting.json`. Preserve its public audience and publish updates to the existing site; do not create a replacement site.
- Continue long-running work from `docs/atlas-update-plan.md`, `docs/atlas-review-ledger.json` and the generated `artifacts/europe-atlas/update-progress.json`. Never infer completion from record counts or course links.
- Run `npm run audit:atlas` after history data changes. Its public compact result is `src/europe/atlas-progress-summary.json`; detailed progress is mirrored to `docs/atlas-node-progress.json` for collaborators and the ignored artifact path for local continuation.
- Keep course full text and the supplied PDF out of source and deployment. `course-chapter-ranges.json` stores only chapter numbers and physical page ranges for reference validation.
- Validate changed data and affected interactions with meaningful Vitest tests, regenerate affected geometry, and run `npm run build`. Browser-check changed UI when available, including returned city state and responsive layout where affected.
- Publication is complete only after GitHub push, Sites source preparation/package, native saved version/deployment success and matching live JS/CSS hashes. Record actual version, commit and remaining limits in release checkpoints. Tokens/credentials stay in session memory and hidden stdin, never files or output.
- Historical reading envelopes, source snapshots, title/claim, effective control and community evidence are distinct. Do not copy neighboring years, add race percentages, or call regional context full Europe coverage.
