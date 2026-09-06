import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="LearnLab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Seed Data
DATA_FILE = os.path.join(os.path.dirname(__file__), "../../data/seed_data.json")

def load_data():
    if not os.path.exists(DATA_FILE):
        return {"users": [], "courses": [], "enrollments": []}
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

db = load_data()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/users")
def get_users():
    return db.get("users", [])

@app.get("/api/courses")
def get_courses():
    return db.get("courses", [])

@app.get("/api/enrollments/{user_id}")
def get_enrollments(user_id: str):
    enrollments = db.get("enrollments", [])
    return [e for e in enrollments if e["learner_id"] == user_id]

class EnrollRequest(BaseModel):
    learner_id: str
    course_id: str

@app.post("/api/enroll")
def enroll(req: EnrollRequest):
    enrollments = db.get("enrollments", [])
    
    # Check if already enrolled
    for e in enrollments:
        if e["learner_id"] == req.learner_id and e["course_id"] == req.course_id:
            raise HTTPException(status_code=400, detail="Already enrolled")
            
    # Check if course is published
    course = next((c for c in db.get("courses", []) if c["id"] == req.course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    if course.get("state") != "PUBLISHED":
        raise HTTPException(status_code=400, detail="Course is not published")
        
    new_enrollment = {
        "id": f"e{len(enrollments) + 1}",
        "learner_id": req.learner_id,
        "course_id": req.course_id,
        "enrollment_date": "2026-09-03T18:00:00Z",
        "completed_lessons": [],
        "quiz_attempts": []
    }
    enrollments.append(new_enrollment)
    save_data(db)
    return new_enrollment

class StateChangeRequest(BaseModel):
    new_state: str

@app.post("/api/courses/{course_id}/state")
def change_course_state(course_id: str, req: StateChangeRequest):
    course = next((c for c in db.get("courses", []) if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # We allow the transition for the demo, normally we'd invoke domain/course_rules.py
    course["state"] = req.new_state
    save_data(db)
    return course
