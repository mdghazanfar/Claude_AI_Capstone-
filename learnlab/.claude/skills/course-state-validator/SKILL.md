---
name: course-state-validator
description: Validates and enforces course lifecycle transitions.
---

# Course State Validator Skill

When implementing course publishing logic, you MUST enforce:
1. Valid states are `DRAFT`, `PUBLISHED`, `UNPUBLISHED`, `ARCHIVED`.
2. Courses must start as `DRAFT`.
3. Valid transitions:
   - `DRAFT` -> `PUBLISHED`
   - `PUBLISHED` -> `UNPUBLISHED`
   - `UNPUBLISHED` -> `ARCHIVED`
4. Invalid transitions must explicitly raise `InvalidCourseStateException`.
5. Only `PUBLISHED` courses can be enrolled by learners.
