def can_grade(user_role: str, user_id: str, course_instructor_id: str) -> bool:
    if user_role == "Instructor" and user_id == course_instructor_id:
        # Instructor cannot grade their own course learners manually
        return False
    return True
