def can_enroll(course_state: str, existing_enrollments: list[str], user_id: str) -> bool:
    if course_state != "PUBLISHED":
        return False
    if user_id in existing_enrollments:
        return False
    return True
