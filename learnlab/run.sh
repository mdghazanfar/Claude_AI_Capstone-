#!/usr/bin/env bash
echo "Setting up LearnLab LMS..."
cd backend
echo "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate
echo "Installing backend dependencies..."
pip install -r requirements.txt
echo "Starting backend..."
uvicorn src.main:app --reload --port 8000 &
BACKEND_PID=$!
cd ../frontend
echo "Fixing npm dependencies bug..."
rm -rf node_modules package-lock.json
echo "Installing frontend dependencies using pnpm..."
npx -y pnpm install
echo "Starting frontend..."
npx -y pnpm run dev &
FRONTEND_PID=$!

cd ..
echo "Running seed script..."
./.claude/commands/seed-data.sh

echo "LearnLab started. Press Ctrl+C to stop."
wait $BACKEND_PID
wait $FRONTEND_PID
