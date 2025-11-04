interface AuthUser {
  email: string;
  password: string;
}

interface PostFixture {
  titleBase: string;
  body: string;
}

interface PostData {
  newPost: PostFixture;
  deletePost: PostFixture;
}

describe("2. Post Management Tests (CRUD Operations)", () => {
  let user: AuthUser;
  let postData: PostData;

  before(() => {
    cy.fixture("auth.json").then((auth) => {
      user = auth.admin;
    });

    cy.fixture("postData.json").then((data) => {
      postData = data;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit("/posts");
  });

  it("POST-T-001: should be able to create a new post", () => {
    cy.createTestPost(postData.newPost.titleBase, postData.newPost.body).then(
      (postTitle) => {
        cy.url().should("equal", "http://localhost:3000/posts");
        cy.contains(postTitle).should("be.visible");
      }
    );
  });

  it("POST-T-002: should display all existing posts on the homepage", () => {
    cy.url().should("equal", "http://localhost:3000/posts");

    cy.get('a[href^="/posts/"]').should("have.length.at.least", 1);
    cy.contains("Alice").should("be.visible");
    cy.contains("New Post").should("be.visible");
  });

  it("POST-T-003: should be able to delete an existing post", () => {
    cy.createTestPost(
      postData.deletePost.titleBase,
      postData.deletePost.body
    ).then((postTitle) => {
      cy.contains(postTitle).click();

      cy.contains("Delete Post").click();

      cy.on("window:confirm", () => true);

      cy.url().should("equal", "http://localhost:3000/posts");
      cy.contains(postTitle).should("not.exist");
    });
  });
});
