import {el} from './elements'

class LoginPage {

    go() {
        cy.visit('http://localhost:3000/')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.submitButton).click()
    }
}

export default new LoginPage()