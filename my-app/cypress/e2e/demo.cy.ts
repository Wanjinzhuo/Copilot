describe('Login', () => {
  it('logs in to the app and validates account name and balance', () => {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('Katharina_Bernier')
    cy.get('#password').type('s3cret')
    cy.get('.MuiButton-label').click()
    cy.get('[data-test=sidenav-user-full-name]').contains('Edgar J')
    cy.get('[data-test=sidenav-user-balance]').invoke('text').then((currentBalance) => {
      cy.log(currentBalance)
    })
  })
})