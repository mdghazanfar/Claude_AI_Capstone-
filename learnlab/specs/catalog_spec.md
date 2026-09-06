# Specification: Catalog

## Overview
Admins manage the course catalog, approve published courses, and monitor enrollment-level analytics. Learners search for courses.

## Acceptance Criteria
- AC-CATALOG-01: Admin can publish a DRAFT course (DRAFT -> PUBLISHED).
- AC-CATALOG-02: Admin can unpublish a PUBLISHED course (PUBLISHED -> UNPUBLISHED).
- AC-CATALOG-03: Course lifecycle transitions DRAFT -> PUBLISHED, PUBLISHED -> UNPUBLISHED, UNPUBLISHED -> ARCHIVED are enforced.
- AC-CATALOG-04: Invalid state transitions raise InvalidCourseStateException.
- AC-CATALOG-05: Learners can browse and search published courses by category and difficulty.
- AC-CATALOG-06: Admin can view enrollment-level analytics for published courses.
