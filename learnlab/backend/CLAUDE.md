# Backend CLAUDE.md

## General Rules
- Always use Python 3.12+ features (type hints, etc).
- Use FastAPI for all endpoints.
- Ensure all business logic remains in `src/domain/` and is decoupled from FastAPI.
- All endpoints must return standard JSON responses.
- Database access is via SQLAlchemy in `src/repositories/`. No direct DB calls from controllers.

## TDD
- Write tests in `tests/` matching AC IDs.
- Run `pytest` frequently.
