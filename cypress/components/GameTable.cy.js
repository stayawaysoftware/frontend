import React from 'react'
import GameTable from '../../src/components/GameTable/GameTable'

describe('<GameTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameTable />)
  })
})