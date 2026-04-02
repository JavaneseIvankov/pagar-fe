# Codebase Drift Tasks

Use this file as the entry point, not as the full working plan.

## Read Order

1. Active working plan:
   `.agents/context/codebase-drift-active.md`
2. Historical context and completed work:
   `.agents/context/codebase-drift-archive.md`

## Planning Standard

All active codebase-drift planning MUST follow the
`$parallel-task-planner` paradigm.

For drift work, this means every active or newly added task plan MUST
include:
- stable task IDs such as `T01`, `T02`, `T03`
- direct dependencies only
- recommended execution batches
- explicit write scopes
- per-task parallel notes
- one final integration, verification, or closeout task

Active drift plans are non-compliant if they:
- use ad hoc unordered task lists as the main execution plan
- omit a real dependency that gates another task
- mark tasks as parallel when they share the same write scope without a
  clear ownership split
- renumber stable task IDs without a real planning reason
- close out the plan without an explicit final integration step

Use this file to enforce the standard. Keep the actual execution-ready
backlog in `.agents/context/codebase-drift-active.md`.

## File Roles

### `.agents/context/codebase-drift-tasks.md`
- Purpose:
  - index file only
  - tells agents where to read first
  - explains how the split is organized
  - defines the mandatory planning standard for drift work
- Keep here:
  - short read-order guidance
  - short rules for what belongs in the active file vs archive
  - required structure rules for active drift planning
- Do not keep here:
  - live task details
  - completed-task history
  - long architectural reasoning

### `.agents/context/codebase-drift-active.md`
- Purpose:
  - default working context for the current drift effort
  - the file an agent should load first when continuing the work
  - the canonical execution-ready backlog for active drift work
- Keep here:
  - current architecture decisions that still matter
  - current repo status snapshot
  - current blockers and contract gaps
  - active tasks only
  - recommended next order
  - dependency summary
  - execution batches
  - current verification baseline if it is still true
- Do not keep here:
  - fully completed historical tasks
  - superseded migration plans
  - long narratives about why old decisions changed
  - task entries without stable IDs, dependencies, write scopes, and
    parallel notes

### `.agents/context/codebase-drift-archive.md`
- Purpose:
  - preserve completed work, superseded plans, and historical reasoning
  - serve as fallback context when an agent needs the full migration history
- Keep here:
  - completed tasks
  - old task batches
  - old dependency summaries
  - decisions that are no longer active but may matter for traceability
  - historical notes about why the plan changed over time
- Do not optimize this file for brevity:
  - this file is allowed to be long
  - completeness matters more than compactness here

## Required Active Plan Shape

When `.agents/context/codebase-drift-active.md` introduces or updates
active drift work, it MUST use this structure:
- `## Dependency Summary`
- `## Recommended Execution Batches`
- `## Task List`

Each task entry MUST include:
- `Goal`
- `Deliverables`
- `Write Scope`
- `Dependencies`
- `Parallel Notes`

Optional fields such as `Risks`, `Open Questions`, and `Owner Guidance`
are allowed when they improve handoff quality, but they do not replace
the required fields.

## Update Rules

### When to update `.agents/context/codebase-drift-active.md`
- Update it when:
  - task status changes
  - a blocker is removed or discovered
  - the recommended next order changes
  - a contract gap is clarified
  - a transitional area becomes contract-backed or is intentionally frozen
  - new work is added to the active drift backlog
- How to write updates:
  - be concise
  - prefer current state over history
  - rewrite stale bullets instead of appending duplicate notes
  - keep the file readable in one pass
  - preserve stable task IDs where possible
  - add only direct dependencies
  - keep execution batches parallel-safe by write scope
  - keep one explicit final integration or verification task
  - if a newer external API client exists but has not yet been merged into `src/lib/api/*`, treat current contract-backed status as provisional and add a blocking client-refresh task before downstream adoption work

### When to update `.agents/context/codebase-drift-archive.md`
- Update it when:
  - a task becomes completed
  - an old plan is replaced by a new one
  - historical rationale should be preserved before simplifying the active file
- How to write updates:
  - preserve traceability
  - keep completed outcomes and important old assumptions
  - it is fine to be more detailed than the active file
  - retain task IDs and dependency history when archiving a prior plan

### When to update `.agents/context/codebase-drift-tasks.md`
- Update it only when:
  - the split structure changes
  - the read order changes
  - the instructions for maintaining the split need to change
  - the required drift planning standard needs to change
- How to write updates:
  - keep it short
  - treat it as stable guidance, not a running log
  - update the policy here before changing the active-plan structure

## Writing Style

- Active file:
  - short, current, execution-oriented
  - structured for agent handoff and parallel execution
  - optimize for low token cost and fast re-entry
- Archive file:
  - durable, historical, traceable
  - optimize for completeness when deeper context is needed
- Index file:
  - minimal and instructional
  - optimize for routing the reader correctly

## Why This Split Exists

- The active file stays small, current, and cheap to load.
- The archive preserves completed tasks and superseded reasoning.
- Agents should default to the active file unless historical context is specifically needed.
