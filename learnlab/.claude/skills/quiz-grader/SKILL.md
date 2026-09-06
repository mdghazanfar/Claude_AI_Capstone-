---
name: quiz-grader
description: Specialized rules for generating deterministic quiz grading logic.
---

# Quiz Grader Skill

When generating quiz grading code, you MUST:
1. Ensure the return type is an integer (percentage 0-100).
2. Avoid any floating-point arithmetic. Use integer division (e.g., `(correct_answers * 100) // total_questions`).
3. Store attempts in an append-only structure. Do not update or delete previous attempt rows.
4. Extract the best score by reading all attempts and computing `MAX()`.
