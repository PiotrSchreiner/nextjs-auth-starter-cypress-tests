/// <reference types="cypress" />

interface AuthUser {
  email: string;
  password: string;
}

describe("3. UI Stability and Responsiveness Tests", () => {
  let user: AuthUser;

  before(() => {
    cy.fixture("auth.json").then((auth) => {
      user = auth.admin;
    });
  });

  // *Hinweis: beforeEach ist nur für T-001 und T-002 relevant, die /posts prüfen.*

  it("UI-T-001: should display the main layout correctly on a mobile viewport (iPhone X)", () => {
    cy.login(user.email, user.password); // Login, da wir geschützte Seiten prüfen
    cy.viewport("iphone-x");

    cy.visit("/posts");

    // Prüfungen für eingeloggte User auf Mobile
    cy.contains("Posts").should("be.visible");
    cy.contains("New Post").should("be.visible");
    cy.contains("Sign Out").should("be.visible");
  });

  it("UI-T-002: should display the main layout correctly on a standard desktop viewport", () => {
    cy.login(user.email, user.password); // Login, da wir geschützte Seiten prüfen
    cy.viewport(1280, 720);

    cy.visit("/posts");

    // Prüfungen für eingeloggte User auf Desktop
    cy.contains("Posts").should("be.visible");
    cy.contains("New Post").should("be.visible");
    cy.contains("Sign Out").should("be.visible");
  });

  // NEUER TEST: UI-T-003 (Nicht-eingeloggte/Login-Seite auf Mobile)
  it("UI-T-003: should display the login page correctly on a mobile viewport (iPhone X)", () => {
    // KEIN cy.login HIER
    cy.viewport("iphone-x");

    cy.visit("/login");

    // Prüft, ob die Login-Formular-Elemente auf Mobile sichtbar sind und nicht überlappen
    cy.contains("Sign in to your account").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.contains("Sign In").should("be.visible");
  });
});
