---
name: parallel-task-planner
description: Builds dependency-aware task backlogs and execution plans optimized for parallel agentic work. Use this skill whenever the user asks to turn findings, requirements, audits, migrations, or implementation work into a task list, backlog, rollout plan, dependency graph, execution phases, or anything that needs explicit parallelization and task dependencies.
---

# Parallel Task Planner

Use this skill to convert a body of work into an execution-ready plan that can be split across multiple agents without unnecessary blocking or merge conflict churn.

The goal is not just to list tasks. The goal is to produce a plan with:
- stable task IDs
- explicit direct dependencies
- parallel-safe execution batches
- disjoint write scopes where possible
- a clear final integration step

## Core Principles

1. Model dependencies conservatively, but do not invent them.
   Only add a dependency when task B truly cannot be completed before task A lands. Do not encode preferences as hard dependencies.

2. Prefer direct dependencies over transitive clutter.
   If `T03` depends on `T02`, and `T02` depends on `T01`, do not also list `T01` as a dependency of `T03` unless it is independently required.

3. Split by write scope when parallel execution matters.
   Two tasks can be logically independent and still be poor candidates for parallel work if they edit the same files. When possible, partition work so concurrent tasks have disjoint write scopes.

4. Separate foundation, feature, migration, and integration work.
   A good parallel plan usually has:
   - foundational prerequisites
   - multiple feature or vertical-slice tasks
   - migration tasks that adopt the new foundation
   - one cleanup/integration/verification task at the end

5. Include a final integration task.
   Parallel plans need one explicit place to absorb residual cleanup, conflict resolution, formatting, verification, and any follow-up edits discovered during merge.

## When to Use

Use this skill whenever the user asks for any of the following:
- "turn this into tasks"
- "make a backlog"
- "write an execution plan"
- "break this into agent tasks"
- "what can run in parallel?"
- "add dependencies between tasks"
- "make this ready for parallel agents"
- "convert this review/audit into a rollout plan"

This skill is especially useful after:
- a code review
- an architecture audit
- a migration design
- a refactor proposal
- a requirements discussion
- a bug cluster analysis

## Workflow

Follow this sequence.

### Step 1: Extract work items from the source material

Identify:
- foundational setup work
- independent feature slices
- migration/adoption work
- cleanup and verification work

Prefer tasks that produce a concrete outcome. Avoid vague items like "improve code quality" unless they can be bounded.

### Step 2: Assign stable task IDs

Use simple IDs such as:
- `T01`, `T02`, `T03`

Keep them stable throughout the document so agents and humans can refer to them unambiguously.

### Step 3: Define each task's write scope

For every task, name the intended write scope:
- directories
- files
- modules
- ownership boundary

If two candidate tasks would both edit the same files, either:
- merge them into one task, or
- redefine them so their write scopes no longer overlap

### Step 4: Determine direct dependencies

For each task, ask:
- What must already exist for this task to start?
- Is that prerequisite logical, technical, or just preferred sequencing?

Only keep hard prerequisites in the dependency list.

### Step 5: Build execution batches

Group tasks into waves:
- Batch 1: tasks with no dependencies
- Batch 2: tasks unlocked by Batch 1
- Batch 3: migration/adoption tasks
- Final batch: cleanup/integration/verification

Call out which tasks are safe to run in parallel.

### Step 6: Produce a concise dependency summary

Include a direct-dependency graph in plain text when possible. Keep it readable.

Example:

```text
T01 ─┬─> T03 ──> T06 ─┐
     └─> T04 ──> T07 ─┼─> T09

T02 ──────────────────┘
```

### Step 7: Write the task backlog

For each task, include:
- `Goal`
- `Deliverables`
- `Write Scope`
- `Dependencies`
- `Parallel Notes`

Optionally include:
- `Risks`
- `Open Questions`
- `Owner Guidance`

## Output Template

Use this structure unless the user requests another format.

~~~md
# [Plan Title]

Brief summary of what the plan covers.

## Dependency Summary

~~~text
[dependency graph]
~~~

## Recommended Execution Batches

### Batch 1
- `T01` ...
- `T02` ...

### Batch 2
- `T03` ...

## Task List

## `T01` [Task Name]
- Goal: ...
- Deliverables:
  - ...
  - ...
- Write Scope:
  - ...
- Dependencies:
  - None
- Parallel Notes:
  - Safe to run in parallel with ...

## `T02` [Task Name]
- Goal: ...
- Deliverables:
  - ...
- Write Scope:
  - ...
- Dependencies:
  - `T01`
- Parallel Notes:
  - ...
~~~

## Planning Heuristics

Use these heuristics to improve task quality:

- Put scaffolding tasks first if many later tasks depend on a common foundation.
- Prefer vertical slices after the foundation is in place.
- Make migration tasks consume the outputs of foundation tasks instead of rebuilding their own local variants.
- If a task exists only to "clean up leftovers," defer it to the final integration step.
- When planning for multiple agents, optimize for low coordination cost, not just theoretical parallelism.
- If a task would force repeated rebasing or file conflict resolution, it is not truly parallel-safe.

## Anti-Patterns

Avoid these failure modes:

- Over-serializing the plan with unnecessary dependencies
- Creating parallel tasks that all edit the same module
- Writing tasks that are too vague to hand off
- Mixing foundational changes and feature migrations into the same task when separate agents could handle them
- Omitting a final verification task
- Using project-specific assumptions when the plan should be generic

## File Writing Guidance

If the user asks for the plan in a file:
- default to a Markdown file
- use the template above
- keep task IDs stable
- keep dependencies explicit and easy to scan

If the user does not specify a filename:
- choose a descriptive, general name such as `execution-plan.md`, `parallel-task-plan.md`, or `dependency-backlog.md`
- place it where planning artifacts naturally live for that codebase

## Example Use Cases

### Example 1
User intent: "Turn this architecture review into tasks, with dependencies so I can hand it to several agents."

Expected behavior:
- extract drift items
- create foundation tasks first
- isolate feature migrations by write scope
- produce direct dependencies and parallel batches

### Example 2
User intent: "Make a migration backlog for this refactor and show what can run in parallel."

Expected behavior:
- separate scaffolding from adoption
- group independent migrations into the same batch
- add one final integration/verification task
