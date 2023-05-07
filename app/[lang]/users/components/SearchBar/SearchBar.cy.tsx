import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('calls onSearch when the form is submitted', () => {
    cy.mount(<SearchBar onSearch={cy.stub().as('onSearch')} />, {
      withI18n: true,
    });
    cy.findByRole('textbox').type('test{enter}');
    cy.get('@onSearch').should('have.been.calledOnceWithExactly', 'test');
  });

  it('clears the input when the clear button is clicked', () => {
    cy.mount(<SearchBar />, { withI18n: true });
    cy.findByRole('textbox').type('test');
    cy.findByLabelText('clear').click();
    cy.findByRole('textbox').should('have.value', '');
  });

  it('displays a loading animation when the loading prop is true', () => {
    cy.mount(<SearchBar loading />, { withI18n: true });
    cy.findByText('searching').should('exist');
  });
});
