def calculate_score(correct_answers: int, total_questions: int) -> int:
    if total_questions == 0:
        return 0
    return (correct_answers * 100) // total_questions
