/// <reference types="Cypress" />

context('Search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('opens available options', () => {
    cy.get('.client-search')
      .click()
  })

  it('allows to choose an option', () => {
    cy.get('.client-search')
      .click()

    cy.get('.react-select__menu-list')
      .first('.react-select__option')
      .click()
  })

  it('allows to delete an option', () => {
    cy.get('.client-search')
      .click()

    cy.get('.react-select__menu-list')
      .first('.react-select__option')
      .click()

    cy.get('.react-select__multi-value__remove')
      .click()
  })
})
