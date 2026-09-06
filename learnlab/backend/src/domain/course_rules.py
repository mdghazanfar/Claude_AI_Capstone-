class InvalidCourseStateException(Exception):
    pass

def validate_transition(current_state: str, new_state: str):
    allowed_transitions = {
        "DRAFT": ["PUBLISHED"],
        "PUBLISHED": ["UNPUBLISHED"],
        "UNPUBLISHED": ["ARCHIVED"],
        "ARCHIVED": []
    }
    if new_state not in allowed_transitions.get(current_state, []):
        raise InvalidCourseStateException(f"Cannot transition from {current_state} to {new_state}")
