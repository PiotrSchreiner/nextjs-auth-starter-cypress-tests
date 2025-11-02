# 📄 Test Plan: Next.js Auth Starter E2E Testing with Cypress

**Project:** nextjs-auth-starter-cypress-tests
**Goal:** Ensure the core functionality (Authentication and Content Management) of the Next.js application is validated using End-to-End tests powered by Cypress.

---

## 1. Test Objective

The objective is to validate the entire end-user workflow, from registration and login to interaction with protected resources, while adhering to the **App Actions Pattern** for maintainability.

---

## 2. Test Scope

| Area                     | Functionality                                                                 | Test Level | Tool                   |
| :----------------------- | :---------------------------------------------------------------------------- | :--------- | :--------------------- |
| **Authentication**       | Registration, Login, Logout, Password Reset (if available), Protected Routes. | E2E        | Cypress                |
| **Content Management**   | Create, Read, Update, and Delete Posts (CRUD).                                | E2E & API  | Cypress (`cy.request`) |
| **UI Stability**         | Page rendering, Navigation, Layout errors across common viewports.            | E2E        | Cypress                |
| **Setup/Infrastructure** | DB Migration and Seed process.                                                | Setup/CI   | NPM/Prisma             |

---

## 3. Test Strategy & Architecture

### 3.1. Test Framework & Language

- **Framework:** Cypress
- **Language:** TypeScript (TS), matching the application's language.
- **Build Manager:** NPM/Node.js

### 3.2. Test Pattern (Best Practice)

We utilize a lightweight, Screenplay-inspired approach focused on clean test cases:

1.  **Page Objects/Locators (Optional):** Centralized locator files are used for critical pages (Login, Register) to manage selectors (e.g., `data-cy="login-submit-button"`).
2.  **App Actions (Focus):** All business logic (e.g., `cy.login('user', 'pass')`, `cy.createPost('title', 'content')`) is extracted into Cypress **Custom Commands** or **App Action Services**. **This keeps test cases concise and readable.**

### 3.3. Environment (CI/Local)

The tests are executed against a consistent application environment ensured by CI steps:

- **Setup (`beforeEach`/`beforeAll`):** Ensure the application is running and the database (Prisma/SQLite) is reset to a defined state (Seed Data) to guarantee test isolation.
- **Start Command:** `npm run dev` or `npm run start` in the CI/CD pipeline.

---

## 4. High-Level Test Cases

### 4.1. Functionality: Login/Logout

- `AUTH-T-001`: Successful login with valid Admin credentials.
- `AUTH-T-002`: Failed login with invalid credentials (Validating the error message).
- `AUTH-T-003`: Successful logout and return to the login page.
- `AUTH-T-004`: Access to a protected route (e.g., `/posts/new`) without login is blocked and redirects to the login page (if middleware is implemented).

### 4.2. Functionality: Post Management (CRUD)

- `POST-T-001`: Successfully **C**reating a new post (End-to-End).
- `POST-T-002`: The created post is successfully **R**ead (visible) on the `/posts` listing page.
- `POST-T-003`: Successfully **U**pdating a post and verifying the changes on the listing page.
- `POST-T-004`: Successfully **D**eleting a post and verifying its removal from the listing.

---

## 5. Definition of Done

- All High-Level Test Cases are implemented in Cypress.
- Tests run **stably** in the local development environment and on CI.
- All selectors use **`data-cy`** attributes to maximize maintainability.
- Test logic is centralized in Custom Commands / App Actions.
