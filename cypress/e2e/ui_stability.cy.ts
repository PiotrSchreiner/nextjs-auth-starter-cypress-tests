interface AuthUser {
  email: string;
  password: string;
}

interface Viewports {
  mobile: Cypress.ViewportPreset | [number, number];
  desktop: [number, number];
}

describe("3. UI Stability and Responsiveness Tests", () => {
  let user: AuthUser;
  let viewports: Viewports;

  before(() => {
    cy.fixture("auth.json").then((auth) => {
      user = auth.admin;
    });

    cy.fixture("viewports.json").then((data) => {
      viewports = data;
    });
  });

  it("UI-T-001: should display the main layout correctly on a mobile viewport (iPhone X)", () => {
    cy.login(user.email, user.password);
    cy.viewport(viewports.mobile as Cypress.ViewportPreset);

    cy.visit("/posts");

    cy.checkPostsLayout();
  });

  it("UI-T-002: should display the main layout correctly on a standard desktop viewport", () => {
    cy.login(user.email, user.password);
    cy.viewport(viewports.desktop[0], viewports.desktop[1]);

    cy.visit("/posts");

    cy.checkPostsLayout();
  });

  it("UI-T-003: should display the login page correctly on a mobile viewport (iPhone X)", () => {
    cy.viewport(viewports.mobile as Cypress.ViewportPreset);

    cy.visit("/login");

    cy.contains("Sign in to your account").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.contains("Sign In").should("be.visible");
  });
});
