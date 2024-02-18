import { el } from "./elements";
import toast from "../../components/toast";

class resetPassPage {
  constructor() {
    this.toast = toast;
  }

  go(token) {
    cy.visit("http://localhost:3000/reset-password?token=" + token);
  }

  form(newPass, confirmPass) {
    cy.get(el.password).clear().type(newPass);

    cy.get(el.password2).clear().type(confirmPass);
  }
  submit() {
    cy.contains(el.changePassButton).click();
  }
}

export default new resetPassPage();
