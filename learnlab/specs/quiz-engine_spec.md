# Specification: Quiz Engine

## Overview
Learners take quizzes at the end of modules. Quizzes are automatically graded deterministically.

## Acceptance Criteria
- AC-QUIZ-01: Quiz supports MCQ (single correct) and TRUE/FALSE question types.
- AC-QUIZ-02: Quizzes are auto-graded by a deterministic rule.
- AC-QUIZ-03: Quiz scores are computed deterministically in integer percentages (no floating-point calculations).
- AC-QUIZ-04: Learner can attempt a quiz multiple times.
- AC-QUIZ-05: The best score across all attempts is recorded for the learner.
- AC-QUIZ-06: Each quiz attempt is timestamped and append-only.
- AC-QUIZ-07: Instructors cannot grade their own courses' learners manually (enforced by architecture test / domain rule).
