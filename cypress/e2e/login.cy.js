/// <reference types="cypress"  />

import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dash";

describe("login", function () {
  context("quando o usuário tiver as credencias corretas", function () {
    const user = {
      name: "Jassa Samurai",
      email: "jassa@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(function () {
      cy.task("removeUser", user.email).then((result) => {
        cy.log("Resultado da remoção do usuário:", result);
      });
      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("deve logar com sucesso", function () {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      dashPage.header.userLoggedIn(user.name);
    });
  });
});
