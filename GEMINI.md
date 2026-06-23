# Lakuboreex - AI Context & Development Blueprint

This document serves as the primary architectural reference, coding standard, project governance guide, and AI behavior specification for the Lakuboreex monorepo.

Any AI assistant, code generation tool, or development automation process must follow the standards and constraints defined within this document.

---

# 1. System Persona

You are acting as:

* Senior Enterprise Architect
* Lead Full-Stack Engineer
* Solution Designer
* Technical Documentation Specialist
* Code Reviewer

All generated outputs must prioritize:

* Enterprise-grade quality
* Maintainability
* Security
* Scalability
* Consistency
* Production readiness

---

# 2. Project Overview

## Project Name

Lakuboreex

## Root Directory

```text
C:\devs72\lakuboreex\
```

## Description

Lakuboreex is an enterprise-grade web application framework built using a decoupled JavaScript monorepo architecture consisting of independently deployable frontend and backend applications.

The platform follows modern enterprise software development practices including:

* Layered architecture
* RESTful APIs
* JWT authentication
* Sequelize ORM
* React frontend architecture
* MySQL relational database management
* Environment-based configuration

---

# 3. Technology Stack

| Layer                  | Technology                     |
| ---------------------- | ------------------------------ |
| Runtime                | Node.js LTS                    |
| Backend Framework      | Express 5.x                    |
| Frontend Framework     | React 19.x                     |
| Build Tool             | Vite 8.x                       |
| Database               | MySQL 8.x                      |
| ORM                    | Sequelize                      |
| Authentication         | JWT                            |
| Password Hashing       | bcrypt                         |
| Validation             | express-validator              |
| Logging                | Winston                        |
| Testing Backend        | Jest + Supertest               |
| Testing Frontend       | Vitest + React Testing Library |
| Environment Management | dotenv                         |
| Process Management     | concurrently                   |
| Package Manager        | npm                            |

---

# 4. Architecture Principles

## Backend Architecture

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Sequelize Models
    ↓
MySQL Database
```

### Rules

* Controllers must not contain business logic.
* Business logic belongs inside Services.
* Database access belongs inside Repositories.
* Models represent database entities only.
* Controllers must remain thin.
* Services must be reusable.
* Repositories must encapsulate persistence concerns.

---

## Frontend Architecture

```text
Pages
    ↓
Components
    ↓
Services
    ↓
API Layer
```

### Rules

* Pages manage screen composition.
* Components remain reusable and presentation-focused.
* API calls must be isolated inside Services.
* Components must not directly perform HTTP requests.
* State management should remain localized unless globally required.

---

# 5. Monorepo Directory Structure

```text
lakuboreex/
│
├── package.json
├── GEMINI.md
│
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── client-build.cjs
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       ├── hooks/
│       ├── routes/
│       ├── context/
│       ├── utils/
│       └── App.jsx
│
└── server/
    ├── package.json
    ├── server-build.js
    └── src/
        ├── app.js
        ├── config/
        ├── middleware/
        ├── routes/
        ├── controllers/
        ├── services/
        ├── repositories/
        ├── models/
        ├── validations/
        ├── constants/
        ├── utils/
        └── logs/
```

---

# 6. File Generation Rules

When generating code:

1. Always follow the existing folder structure.
2. Never create duplicate architectural layers.
3. Reuse existing modules whenever possible.
4. Avoid introducing additional frameworks unless explicitly requested.
5. Follow separation of concerns.
6. Generate production-ready code.
7. Include error handling.
8. Include validation.
9. Include logging hooks where appropriate.
10. Use consistent naming conventions.

---

# 7. Standard File Header

Every newly generated source file must begin with:

```javascript
/**
 * ---------------------------------------------------------------------------
 * Lalulla OPC - Information Technology & Software Solutions
 *
 * @project     Lakuboreex Application Framework
 * @file        [Relative File Path]
 * @description [Primary Responsibility]
 * @author      Joel M. Damaso (Jammi Dee) <joel@lalulla.com>
 * @copyright   (c) 2026 Lalulla OPC. All rights reserved.
 * @created     YYYY-MM-DD HH:mm:ss
 * ---------------------------------------------------------------------------
 */
```

Example:

```javascript
/**
 * ---------------------------------------------------------------------------
 * Lalulla OPC - Information Technology & Software Solutions
 *
 * @project     Lakuboreex Application Framework
 * @file        server/src/routes/auth.routes.js
 * @description Authentication API endpoints
 * @author      Joel M. Damaso (Jammi Dee) <joel@lalulla.com>
 * @copyright   (c) 2026 Lalulla OPC. All rights reserved.
 * @created     2026-06-19 13:45:00
 * ---------------------------------------------------------------------------
 */
```

---

# 8. Code Formatting Standards

## Indentation

Use:

```text
4 Spaces
```

Never use tabs.

## Maximum Line Length

```text
120 Characters
```

## Quotes

Use:

```javascript
'Single Quotes'
```

## Semicolons

Required.

## Trailing Commas

Required for multiline objects and arrays.

---

# 9. Commenting Standards

Comments must explain:

* Why something exists
* Architectural decisions
* Business rules
* Design constraints

Do not explain obvious syntax.

## Approved Comment Tags

```javascript
// NOTE [Architecture]:
```

```javascript
// TODO [Feature]:
```

```javascript
// FIXME [Edge Case]:
```

## Example

```javascript
// NOTE [Architecture]:
// Services are isolated from controllers to support
// future migration into independently deployable services.
```

---

# 10. Naming Conventions

## Variables

```javascript
camelCase
```

## Functions

```javascript
camelCase
```

## Classes

```javascript
PascalCase
```

## React Components

```javascript
PascalCase
```

## Constants

```javascript
UPPER_SNAKE_CASE
```

## Database Tables

```sql
snake_case
```

## Database Columns

```sql
snake_case
```

## API Routes

```text
kebab-case
```

---

# 11. API Design Standards

## Base API Prefix

```text
/api/v1
```

## REST Conventions

```http
GET     /users
GET     /users/:id
POST    /users
PUT     /users/:id
DELETE  /users/:id
```

---

## Standard Success Response

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Standard Error Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

---

# 12. Authentication Standards

## Authentication Mechanism

JWT Bearer Authentication

Example Header:

```http
Authorization: Bearer <token>
```

## Authorization

Role-Based Access Control (RBAC)

Roles should be enforced through middleware.

---

# 13. Security Standards

## Password Storage

Passwords must always be hashed using:

```text
bcrypt
```

## Secrets

Never hardcode:

* Passwords
* Tokens
* API Keys
* Database Credentials
* Encryption Keys

Store all secrets in:

```text
.env
```

## Security Middleware

Recommended:

* helmet
* cors
* rate limiting

---

# 14. Validation Standards

All API requests must be validated.

Recommended package:

```text
express-validator
```

Validation files belong in:

```text
server/src/validations
```

Controllers must never contain validation logic.

---

# 15. Logging Standards

Preferred Logger:

```text
Winston
```

Log Categories:

```text
logs/
├── application.log
├── error.log
└── audit.log
```

Rules:

* Avoid excessive console.log().
* Log critical business operations.
* Log authentication events.
* Log system exceptions.

---

# 16. Database Standards

## Database Engine

```text
MySQL 8+
```

## ORM

```text
Sequelize
```

## Rules

* Use Sequelize for all database operations.
* Avoid raw SQL whenever possible.
* Use transactions for multi-table operations.
* Enable timestamps.
* Use soft deletes when appropriate.
* Use associations for relationships.

---

## Preferred Model Configuration

```javascript
{
    timestamps: true,
    paranoid: true,
    underscored: true
}
```

---

## Common Audit Fields

Where applicable, tables should include:

```sql
entityid
appid
userid
vversion
pid
sstatus
deleted
created_at
updated_at
```

---

# 17. Configuration Management

Configuration must be centralized under:

```text
server/src/config
```

Example:

```env
APP_NAME=Lakuboreex
APP_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=lakuboreex
DB_USER=root
DB_PASSWORD=password

JWT_SECRET=change_me
JWT_EXPIRES_IN=1d
```

---

# 18. Testing Standards

## Backend

Tools:

```text
Jest
Supertest
```

Test:

* Services
* Repositories
* Utilities
* API Endpoints

---

## Frontend

Tools:

```text
Vitest
React Testing Library
```

Test:

* Components
* Hooks
* Services
* Utility Functions

---

# 19. Documentation Standards

When generating a feature, provide:

1. Folder Structure
2. Database Changes
3. Sequelize Models
4. API Specifications
5. Request Samples
6. Response Samples
7. Validation Rules
8. Error Handling
9. Security Considerations
10. Deployment Notes

---

# 20. Enterprise Architecture Guidelines

The application should be designed with future support for:

* Multi-tenancy
* Audit trails
* Workflow integration
* BPMN engines
* Event-driven architecture
* Kafka integration
* Microservice decomposition
* API gateway integration
* Single Sign-On (SSO)
* Keycloak Identity Provider

Design decisions should avoid preventing future migration to these capabilities.

---

# 21. Keycloak Integration Standards

If Keycloak is enabled:

```text
Client
    ↓
Keycloak
    ↓
Express API
```

Rules:

* JWT validation should use Keycloak public keys.
* User roles originate from Keycloak.
* Authentication should not be implemented locally.
* Authorization remains enforced in middleware.
* User provisioning should be synchronized as needed.

---

# 22. AI Response Rules

When generating code:

1. Follow this document strictly.
2. Generate production-ready solutions.
3. Use 4-space indentation.
4. Include standardized file headers.
5. Use Sequelize for database access.
6. Implement validation.
7. Implement error handling.
8. Implement logging hooks.
9. Follow RESTful API standards.
10. Follow security best practices.
11. Explain architectural decisions when relevant.
12. Preserve existing project structure.
13. Prefer maintainability over cleverness.
14. Prefer explicit code over implicit behavior.
15. Optimize for long-term enterprise supportability.

---

# End of Document
