# Business Case: LearnLab - Lightweight Learning Management System

## Problem
An online learning platform wants to launch a lightweight LMS that handles course catalog, lesson delivery, enrollments, progress tracking, and quizzes. This needs to be developed under one constraint: no manual coding, leveraging AI-native engineering practices via Claude Code agents. All external integrations like video streaming and payments are stubbed out.

## Target Users
- **Learners**: End-users who browse, enroll in, and complete online courses. They need intuitive progression tracking and quiz assessments.
- **Instructors**: Content creators who author courses, organize content into modules and lessons, and create quizzes to assess learners.
- **Administrators (Admin)**: Platform managers who oversee the course catalog, publish/unpublish courses, and monitor enrollment metrics and platform engagement.

## Success Metrics
- Fully functional end-to-end LMS without any handwritten production code.
- Deterministic quiz grading returning integer percentages.
- Clean architectural layers enforcing separation of concerns.
- Immutable log of quiz attempts, lesson completions, and enrollments (append-only).
- Comprehensive test coverage and E2E validation.

## Domain Rules (Business Logic)
- **Enrollment Rules**: Learners can enroll in any PUBLISHED course. A learner cannot enroll twice in the same course.
- **Course Lifecycle**: Courses start in DRAFT. Admins can transition courses to PUBLISHED. PUBLISHED courses can transition to UNPUBLISHED. Only PUBLISHED courses allow enrollment.
- **Grading & Assessment**: Quizzes support MCQ (single correct) and TRUE/FALSE. Scoring is deterministic (integer percentage). Best score is retained across multiple attempts.
- **Role Boundaries**: Instructors cannot grade their own courses' learners manually (auto-graded). Learners cannot access another learner's progress.
- **Immutability**: Quiz attempts, lesson completions, and enrollment records are append-only.

## Value Proposition
To deliver a fully AI-generated, high-quality learning platform that reduces manual engineering overhead while strictly adhering to Test-Driven Development (TDD) and strong architectural discipline. LearnLab provides a seamless and structured experience for content creators and learners without the heavy technical burden of traditional development.
