# System Architecture

LearnLab uses a clean, layered architectural pattern.

## Layered Structure
- **Controllers**: Entry points for the API. Handles HTTP requests and responses. Routes traffic to Services. (Auth boundaries are placed here).
- **Services**: Orchestrates business logic, retrieves data from Repositories, applies rules from Domain.
- **Repositories**: Handles data access and persistence to the SQLite database. Ensure append-only operations for tracking.
- **Domain**: Pure business rules and models. No external dependencies.

## Architecture Diagram (C4 Context)

```mermaid
graph TD
    Learner[Learner] --> |Enrolls, Learns, Assesses| Frontend[React Frontend]
    Instructor[Instructor] --> |Authors Courses, Views Progress| Frontend
    Admin[Admin] --> |Manages Catalog| Frontend
    
    Frontend --> |API Calls| Controllers[Controllers Layer]
    Controllers --> Services[Services Layer]
    Services --> Domain[Domain Layer]
    Services --> Repositories[Repositories Layer]
    Repositories --> DB[(SQLite Database)]
```
