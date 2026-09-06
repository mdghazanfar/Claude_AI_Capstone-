# TDD Discipline

All code developed in LearnLab follows the strict Red-Green-Refactor pattern.

## Workflow
1. Write a failing unit test matching an Acceptance Criteria (AC). Tag the test with the AC ID (e.g., `def test_ac_quiz_02_deterministic_grading()`).
2. Run the test to ensure it fails.
3. Write the minimum amount of code to make the test pass.
4. Run the test to ensure it passes.
5. Refactor code for quality without changing behavior.

## Example: AC-05 Quiz Auto-Grading
```python
# RED: Write test for quiz calculation returning integer percentage
def test_ac_quiz_02_deterministic_grading():
    score = calculate_score(correct_answers=3, total_questions=4)
    assert score == 75
    assert isinstance(score, int)

# GREEN: Implement integer division
def calculate_score(correct_answers: int, total_questions: int) -> int:
    return (correct_answers * 100) // total_questions

# REFACTOR: Check for zero division
def calculate_score(correct_answers: int, total_questions: int) -> int:
    if total_questions == 0:
        return 0
    return (correct_answers * 100) // total_questions
```
