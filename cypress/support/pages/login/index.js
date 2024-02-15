import {el} from './elements'
import toast from '../../components/toast'

class LoginPage {

    constructor() {
        this.toast = toast
    }

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

    alertHaveText(expectedText) {
        cy.contains(el.alertError, expectedText)
            .should('be.visible')
    }
}

export default new LoginPage()