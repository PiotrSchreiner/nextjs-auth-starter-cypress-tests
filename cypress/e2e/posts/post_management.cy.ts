interface AuthUser {
  email: string;
  password: string;
}

describe("2. Post Management Tests (CRUD Operations)", () => {
  let user: AuthUser;

  before(() => {
    cy.fixture("auth.json").then((auth) => {
      user = auth.admin;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit("/posts");
  });

  it("POST-T-001: should be able to create a new post", () => {
    const postTitle = `Cypress Test Post ${Cypress._.random(0, 1e6)}`;
    const postBody =
      "This is the content of a new post, created via Cypress E2E.";

    cy.contains("New Post").click();
    cy.url().should("include", "/posts/new");

    cy.get('input[type="text"]').first().type(postTitle);
    cy.get("textarea").first().type(postBody);

    cy.contains("Create Post").click();

    cy.url().should("equal", "http://localhost:3000/posts");

    cy.contains(postTitle).should("be.visible");
  });

  it("POST-T-002: should display all existing posts on the homepage", () => {
    cy.url().should("equal", "http://localhost:3000/posts");
    cy.get('a[href^="/posts/"]').should("exist");
    cy.contains("Alice").should("be.visible");
    cy.contains("New Post").should("be.visible");
  });

  it("POST-T-003: should be able to delete an existing post", () => {
    const postTitle = `Post to Delete ${Cypress._.random(0, 1e6)}`;
    const postBody = "This post will be deleted by Cypress.";

    cy.contains("New Post").click();
    cy.get('input[type="text"]').first().type(postTitle);
    cy.get("textarea").first().type(postBody);
    cy.contains("Create Post").click();
    cy.contains(postTitle).should("be.visible");

    cy.contains(postTitle).click();

    cy.contains("Delete").click();

    cy.on("window:confirm", () => {
      return true;
    });

    cy.visit("/posts");

    cy.url().should("equal", "http://localhost:3000/posts");
    cy.contains(postTitle).should("not.exist");
  });
});
