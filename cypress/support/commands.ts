Cypress.Commands.add("login", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");

      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);

      cy.get('button[type="submit"]').click();

      cy.url().should("not.include", "/login");
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add("checkPostsLayout", () => {
  cy.log("Checking main Posts Layout elements...");
  cy.contains("Posts").should("be.visible");
  cy.contains("New Post").should("be.visible");
  cy.contains("Sign Out").should("be.visible");
});

Cypress.Commands.add("checkLoggedInLayout", () => {
  cy.log("Checking logged-in layout and user elements...");
  cy.contains("Posts").should("be.visible");
  cy.contains("Sign Out").should("be.visible");
  cy.contains("Sign In").should("not.exist");
});

Cypress.Commands.add("createTestPost", (titleBase, body) => {
  const randomId = Math.floor(Math.random() * 100000);
  const title = `${titleBase} ${randomId}`;

  cy.log(`Creating post with title: ${title}`);
  cy.contains("New Post").click();
  cy.get('input[type="text"]').type(title);
  cy.get("textarea").type(body);
  cy.contains("Create Post").click();

  return cy.wrap(title);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      checkPostsLayout(): Chainable<void>;
      checkLoggedInLayout(): Chainable<void>;
      createTestPost(titleBase: string, body: string): Chainable<string>;
    }
  }
}

export {};
