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

  // POST-T-002: Read
  it("POST-T-002: sollte alle vorhandenen Posts auf der Startseite anzeigen", () => {
    cy.url().should("equal", "http://localhost:3000/posts");
    cy.get('a[href^="/posts/"]').should("exist");
    cy.contains("Alice").should("be.visible");
    cy.contains("New Post").should("be.visible");
  });

  // POST-T-001: Create
  it("POST-T-001: sollte einen neuen Post erstellen können", () => {
    const postTitle = `Cypress Test Post ${Cypress._.random(0, 1e6)}`;
    const postBody =
      "Dies ist der Inhalt eines neuen Posts, erstellt über Cypress E2E.";

    cy.contains("New Post").click();
    cy.url().should("include", "/posts/new");

    cy.get('input[type="text"]').first().type(postTitle);
    cy.get("textarea").first().type(postBody);

    cy.contains("Create Post").click();

    cy.url().should("equal", "http://localhost:3000/posts");

    cy.contains(postTitle).should("be.visible");
  });

  // POST-T-003: Update (deaktiviert)
  it.skip("POST-T-003: sollte einen bestehenden Post bearbeiten können", () => {
    const initialTitle = `Post to Edit ${Cypress._.random(0, 1e6)}`;
    const newTitle = `EDITED Post ${Cypress._.random(0, 1e6)}`;
    const initialBody = "Inhalt vor dem Editieren.";
    const updatedPostBody = "Dies ist der AKTUALISIERTE Inhalt des Posts.";

    cy.contains("New Post").click();
    cy.get('input[type="text"]').first().type(initialTitle);
    cy.get("textarea").first().type(initialBody);
    cy.contains("Create Post").click();
    cy.contains(initialTitle).should("be.visible");

    cy.contains(initialTitle).click();

    cy.contains("Edit").click();

    cy.contains("label", "Title").should("be.visible");

    cy.get("input").first().clear().type(newTitle);
    cy.get("textarea").first().clear().type(updatedPostBody);

    cy.contains("Save").should("be.visible").click();

    cy.url().should("equal", "http://localhost:3000/posts");
    cy.contains(newTitle).should("be.visible");
    cy.contains(initialTitle).should("not.exist");
  });

  // POST-T-004: Delete (deaktiviert)
  it.skip("POST-T-004: sollte einen bestehenden Post löschen können", () => {});
});
