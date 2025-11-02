interface AuthUser {
  email: string;
  password: string;
}

describe("1. Authentication Tests", () => {
  let user: AuthUser;

  before(() => {
    cy.fixture("auth.json").then((auth) => {
      user = auth.admin;
    });
  });

  it("should not redirect to the login page when an unauthenticated user visits /posts", () => {
    cy.visit("/posts");

    cy.url().should("include", "/posts");

    cy.contains("Sign In").should("be.visible");
  });

  it("should successfully log in as Admin (Alice) and display the correct UI", () => {
    cy.login(user.email, user.password);

    cy.visit("/posts");

    cy.url().should("not.include", "/login");

    cy.contains("Posts").should("be.visible");

    cy.contains("Sign In").should("not.exist");
    cy.contains("Sign Out").should("be.visible");
  });

  it("should successfully sign out and return to the login page", () => {
    cy.login(user.email, user.password);

    cy.visit("/posts");

    cy.contains("Sign Out").click();

    cy.visit("/login");

    cy.url().should("include", "/login");
    cy.contains("Sign in to your account").should("be.visible");
    cy.contains("Sign Out").should("not.exist");
  });
});
