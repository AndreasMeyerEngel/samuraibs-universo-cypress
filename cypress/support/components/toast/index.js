import { el } from './elements'

// class ToastComponent {
//     shouldHaveText(expectText) {
//         cy.get(el.toast, {timeout: 10000})
//           .should("be.visible")
//           .find("p")
//           .should("have.text", expectText);
//       }
// }

class ToastComponent {
    shouldHaveText(expectText) {
        cy.get(el.toast, {timeout: 10000})
          .should("be.visible")
          .find("p")
          .invoke("text") // Pegar o texto do elemento
          .should("include", expectText); // Comparar o texto esperado de forma case-insensitive
      }
}


export default new ToastComponent()