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

  it("UI-T-001: should display the main layout correctly on a mobile viewport (iPhone X)", () => {
    cy.login(user.email, user.password);
    cy.viewport("iphone-x");

    cy.visit("/posts");

    cy.contains("Posts").should("be.visible");
    cy.contains("New Post").should("be.visible");
    cy.contains("Sign Out").should("be.visible");
  });

  it("UI-T-002: should display the main layout correctly on a standard desktop viewport", () => {
    cy.login(user.email, user.password);
    cy.viewport(1280, 720);

    cy.visit("/posts");

    cy.contains("Posts").should("be.visible");
    cy.contains("New Post").should("be.visible");
    cy.contains("Sign Out").should("be.visible");
  });

  it("UI-T-003: should display the login page correctly on a mobile viewport (iPhone X)", () => {
    cy.viewport("iphone-x");

    cy.visit("/login");

    cy.contains("Sign in to your account").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.contains("Sign In").should("be.visible");
  });
});
