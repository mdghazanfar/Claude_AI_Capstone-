# Knowledge Deposit Log

This log captures recurring mistakes made by agents to prevent them from happening in future sprint cycles.

## 2026-09-03
- **Mistake**: The `quiz-grader-agent` initially tried to use `float` to calculate the percentage, violating the deterministic integer grading rule.
- **Resolution**: Updated `quiz-grader` skill explicitly stating: "Avoid any floating-point arithmetic. Use integer division (e.g., `(correct_answers * 100) // total_questions`)." This skill must be loaded for all grading-related logic.
- **Mistake**: `course-publisher-agent` allowed `DRAFT` to `UNPUBLISHED` transition directly.
- **Resolution**: Updated `course-state-validator` skill to enforce strict state machine graph.
