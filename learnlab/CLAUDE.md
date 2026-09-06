# LearnLab Lightweight LMS

This is a generated AI-native engineering project using the Claude Harness Engine plugin.

## Substrate Layers
- **Backend**: Python FastAPI with SQLite. Tests via pytest. Architecture rules via import-linter.
- **Frontend**: React. Tests via Playwright.

## Build and Run
- Start backend: `cd backend && pip install -r requirements.txt && uvicorn src.main:app --reload`
- Start frontend: `cd frontend && npm install && npm start`
- Start all (unified): `./run.sh`

## Agent Guidelines
- Refer to `AGENTS.md` for the list of custom domain agents available.
- Always follow the "No-Hand-Coding Rule" and "Spec-Is-Truth Rule".
- For backend architectural rules, ensure domain logic is separated from controllers.
- Use `quiz-grader` and `course-state-validator` skills when modifying respective domain logic.
