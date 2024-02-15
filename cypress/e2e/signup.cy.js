/// <reference types="cypress"  />

import signupPage from "../support/pages/signup/index";

describe("cadastro", function () {
  
  context("quando o usuário é novato", function () {
    const user = {
      name: "Theo Meyer",
      email: "theomeyer@gmail.com",
      password: "pwd123",
    };

    before(function () {
      // Remover usuário existente (se existir)
      cy.task("removeUser", user.email).then((result) => {
        // Verifique o resultado da tarefa, se necessário
        cy.log("Resultado da remoção do usuário:", result);
      });
    });

    it("deve cadastrar com sucesso", function () {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o e-mail já existe", function () {
    const user = {
      name: "João Lucas",
      email: "joao@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(function () {
      cy.postUser(user)
    });

    it("não deve cadastrar o usuário", function () {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("quando o email é incorreto", function () {
    const user = {
      name: "Elizabeth Olsen",
      email: "liza.yahoo.com",
      password: "pwd123",
    };

    it("deve exibir mensagem de alerta", function () {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("quando a senha é muito curta", function () {
    const passwords = ["1", "2a", "ab3", "abc4", "ab#c5"];

    beforeEach(function () {
      signupPage.go();
    });

    passwords.forEach(function (p) {
      it("não deve cadastrar com a senha: " + p, function () {
        const user = {
          name: "Jason Friday",
          email: "jason@yahoo.com",
          password: p,
        };
        signupPage.form(user);
        signupPage.submit();
      });
    });

    afterEach(function () {
      signupPage.alertHaveText("Pelo menos 6 caracteres");
    });
  });

  context("quando não preencho nenhum dos campos", function () {

    const alertMessages = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória"
    ];

    beforeEach(function () {
      signupPage.go();
      signupPage.submit();
    });

    alertMessages.forEach(function (alert) {
      it('deve exibir ' + alert.toLowerCase(), function () {
        signupPage.alertHaveText(alert);
      });
    });
  });
});
