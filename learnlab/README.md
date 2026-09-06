# LearnLab LMS - Quick Start

Welcome to LearnLab LMS, developed autonomously using the Claude Harness Engine plugin.

## Prerequisites
- Node.js 20+
- Python 3.12+

## 1. Running the LearnLab Application
The application can be deployed locally using a single startup script. This script automatically handles Python virtual environments and node modules.

Open your terminal and run:
```bash
cd learnlab
./run.sh
```

This command will:
1. Create a Python virtual environment (`venv`) and install FastAPI backend dependencies.
2. Start the FastAPI backend server on **http://localhost:8000**. (API Docs available at `http://localhost:8000/docs`)
3. Install React frontend dependencies using `pnpm` (bypassing npm optional dependency bugs).
4. Start the React frontend on **http://localhost:5173**.
5. Run the database seeder to populate sample instructors, learners, and courses.

To stop the servers, simply press `Ctrl+C` in the terminal where `./run.sh` is running.

---

## 2. Running the AI Agents (Harness Engine)
This Capstone project uses a strict No-Hand-Coding rule. To build the application using the Claude Harness Engine, follow these steps:

1. Open a **new** terminal window (keep the application running in the first terminal).
2. Navigate to the `learnlab` directory:
   ```bash
   cd learnlab
   ```
3. Start the Claude CLI using the local harness plugin:
   ```bash
   claude --plugin-dir .claude
   ```
4. Once the Claude CLI is ready, type the following command to start the autonomous development loop:
   ```bash
   /auto
   ```
*(You can also use `/build` to run the steps interactively.)*

---
## Documentation
- [Business Case](docs/business-case.md)
- [System Architecture](docs/architecture.md)
- [TDD Discipline](docs/tdd.md)

## Agent Commands
- **Seed Data**: `./.claude/commands/seed-data.sh`
- **DB Migrations**: `./.claude/commands/db-migrate.sh`
