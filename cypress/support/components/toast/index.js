import { el } from './elements'

class ToastComponent {
    shouldHaveText(expectText) {
        cy.get(el.toast)
          .should("be.visible")
          .find("p")
          .should("have.text", expectText);
      }
}

export default new ToastComponent()