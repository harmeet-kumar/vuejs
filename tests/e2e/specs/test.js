// https://docs.cypress.io/api/introduction/api.html

describe("Test SignIn", () => {
  it("Visits the Login url", () => {
    cy.visit("#/login");
    cy.get('button').click();
    cy.contains("li", "email or password is invalid");
  });
});
describe("Test SignUp", () => {
  it("Visits the SignUp url", () => {
    cy.visit("#/signup");
    cy.get('button').click();
    cy.contains("li", "email can't be blank");
  });
});

describe("Test Header", () => {
  it("Visits the Home url", () => {
    cy.visit("#/signup");
    cy.get('.nav-link').contains('Sign In').click();
    cy.contains("h1", "Sign in");
  });
});

describe("Open Tagged Articles", () => {
  it("Visits the Home url", () => {
    cy.visit("#/");
    cy.get('.tag-pill').contains('dragons').click();
    cy.contains("h1", "dragon");
  });
});
