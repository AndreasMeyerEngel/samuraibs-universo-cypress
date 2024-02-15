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
        cy.postUser(user)
    });

    it("deve logar com sucesso", function () {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      dashPage.header.userLoggedIn(user.name);
    });
  });

  context.only('quando a senha está incorreta', function(){
    
    let user = {
      name: 'Celso Kamura',
      email: 'kamura@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function(){
      cy.postUser(user).then(function(){
        user.password = 'abc1234'
      })
      
    })
    
    it('deve notificar erro de credenciais', function(){
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.shouldHaveText(message)
    
    })
  })
});
