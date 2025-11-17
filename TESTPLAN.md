# 📄 Test Plan: Next.js Auth Starter E2E Testing with Cypress

**Project:** nextjs-auth-starter-cypress-tests
**Goal:** Ensure the core functionality (Authentication and Content Management) of the Next.js application is validated using End-to-End tests powered by Cypress.

---

## 1. Test Objective

The objective is to validate the entire end-user workflow, from registration and login to interaction with protected resources, while adhering to the **App Actions Pattern** for maintainability.

---

## 2. Test Scope

| Area                     | Functionality                                                                          | Test Level | Tool       |
| :----------------------- | :------------------------------------------------------------------------------------- | :--------- | :--------- |
| **Authentication**       | Login, Logout, Protected Routes.                                                       | E2E        | Cypress    |
| **Content Management**   | **C**reate, **R**ead, and **D**elete Posts (CRUD - excluding Update and API deletion). | E2E        | Cypress    |
| **UI Stability**         | Page rendering, Navigation, Layout errors across common viewports.                     | E2E        | Cypress    |
| **Setup/Infrastructure** | DB Migration and Seed process.                                                         | Setup/CI   | NPM/Prisma |

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

### 4.1. Functionality: Authentication

| ID             | Description                                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **AUTH-T-001** | Unauthenticated access to the main `/posts` page is permitted; the page must display content and the **'Sign In'** button. |
| **AUTH-T-002** | Successful login with valid Admin credentials and redirect to the Posts list.                                              |
| **AUTH-T-003** | Successful logout and return to the login page.                                                                            |
|                |

### 4.2. Functionality: Post Management (C/R/D)

| ID             | Description                                                                             |
| :------------- | :-------------------------------------------------------------------------------------- |
| **POST-T-001** | Successfully **C**reating a new post (End-to-End).                                      |
| **POST-T-002** | The created post is successfully **R**ead (visible) on the `/posts` listing page.       |
| **POST-T-003** | Successfully **D**eleting a post via the UI and verifying its removal from the listing. |

### 4.3. UI Stability

| ID           | Description                                                                        |
| :----------- | :--------------------------------------------------------------------------------- |
| **UI-T-001** | Display of the main layout (Posts list) on a **mobile** viewport (e.g., iPhone X). |
| **UI-T-002** | Display of the main layout on a **desktop** viewport.                              |
| **UI-T-003** | Display of the Login page on a mobile viewport (e.g., iPhone X).                   |

---

## 5. Definition of Done (DoD)

| Criterion                                                        | Status                                    |
| :--------------------------------------------------------------- | :---------------------------------------- |
| All High-Level Test Cases are implemented.                       | **Achieved** (Following scope adjustment) |
| Tests run **stably** (green) in the local environment and on CI. | **Achieved** (Following scope adjustment) |
| All selectors use **`data-cy`** attributes.                      | **Assumed**                               |
| Test logic is centralized in Custom Commands / App Actions.      | **Achieved**                              |

DOD-Ready
