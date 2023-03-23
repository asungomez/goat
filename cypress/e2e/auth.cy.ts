describe('Authentication', () => {
  describe('When there are no credentials in the local storage', () => {
    it('displays the log in button', () => {
      cy.visit('/en');
      cy.findByText('Log in');
    });
  });

  describe('When there are credentials in the local storage', () => {
    beforeEach(() => {
      cy.createUser('mario@casas.com');
      cy.logIn('mario@casas.com');
    });

    afterEach(() => {
      cy.deleteUser('mario@casas.com');
    });

    it('displays the log out button', () => {
      cy.visit('/en');
      cy.findByText('Log out');
    });
  });
});

export {};
