describe("Password reset", () => {
  const serverId = "hhq2ltyd";
  const testEmail = `cold-machinery@hhq2ltyd.mailosaur.net`;
  const invalidEmail = "1234567890";
  const validPassword = "Test12345";

  let passwordResetLink;
  it("Should submit empty email", () => {
    cy.visit("/");

    cy.get("#sso-reset-password-form button").click();

    cy.get("#sso-reset-password-form .invalid-feedback").should(
      "contain",
      "Please provide a valid email address"
    );
  });

  it("Should submit invalid email", () => {
    cy.visit("/");

    cy.get("#myinput4").type(invalidEmail);
    cy.get("#sso-reset-password-form button").click();

    cy.get("#sso-reset-password-form .invalid-feedback").should(
      "contain",
      "Please provide a valid email address"
    );
  });

  it("Should makes a Password Reset request", () => {
    cy.visit("/");
    cy.title().should("equal", "Forgot Password?");

    cy.get("#myinput4").type(testEmail);
    cy.get("#sso-reset-password-form button").click();

    cy.get("#sso-reset-password-form .alert").contains(
      "The reset password email was sent. Please check your email for further instructions."
    );
  });

  it("Should gets a Password Reset email", () => {
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail,
    }).then((email) => {
      expect(email.subject).to.equal("Reset your password");
      passwordResetLink = email.text.links[0].href;
    });
  });

  it("Should follows the link from the email", () => {
    cy.visit(passwordResetLink);
    cy.title().should("contain", "Change Password");

    cy.get("#input1").type(validPassword);
    cy.get("#sso-new-password-form").submit();
  });

  it("Should login with new password", () => {
    cy.visit("https://sso.foxstone.ch/en/signin");

    cy.get("#input1").type(testEmail);
    cy.get("#input2").type(validPassword);
    cy.get("#sso-login-form button").click();

    cy.get("#button-basic").click();
    cy.get("#dropdown-basic").contains("Logout");
  });
});
