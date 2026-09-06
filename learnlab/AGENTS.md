# LearnLab Agents

Table of contents for project-specific domain and technical agents.

## Domain Agents

1. **quiz-grader-agent**: Specialized in generating and evaluating deterministic quiz grading logic. Ensures no floating-point calculations and strict role isolation.
2. **course-publisher-agent**: Handles the state machine for course publishing. Enforces transitions (DRAFT -> PUBLISHED -> UNPUBLISHED -> ARCHIVED).

## Harness Base Agents
- planner
- generator (implementer)
- evaluator (reviewer)
- security-reviewer
- test-engineer (tester)
- design-critic
- ui-designer
