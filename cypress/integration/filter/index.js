/// <reference types="Cypress" />

context('Filter', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('choose available options', () => {
    cy.get('.form-control')
      .select('connected').should('have.value', 'connected')
  })
})
