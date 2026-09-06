# App Specification: LearnLab LMS

## Overview
LearnLab is a lightweight Learning Management System providing course catalog, lesson delivery, enrollments, progress tracking, and quizzes. It is a dual-interface application:
1. Learner Interface
2. Instructor/Admin Interface

## Acceptance Criteria

### General
- AC-01: Application architecture must consist of a React frontend and Python FastAPI backend.
- AC-02: User roles are separated at the controller layer (Learner, Instructor, Admin).
- AC-03: Learner PII is never written to logs in plaintext.
- AC-04: Health endpoint returns 200 within 1 second of startup.
- AC-05: Database migrations and data writing for quiz/progress are append-only.

## Feature Modules
- Course Authoring (Instructor)
- Catalog & Publishing (Admin)
- Enrollment & Learning (Learner)
- Quiz Engine (Learner)
- Progress Tracker (Learner)
- Instructor Workbench (Instructor)
