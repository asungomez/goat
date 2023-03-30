describe('Users management', () => {
  before(() => {
    cy.createUser('visitor@user.com', 'Visitor');
    cy.createUser('editor@user.com', 'Editor');
    cy.createUser('admin@user.com', 'Admin');
  });

  after(() => {
    cy.deleteUser('visitor@user.com');
    cy.deleteUser('editor@user.com');
    cy.deleteUser('admin@user.com');
  });

  describe('When the user is not logged in', () => {
    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.visit('/en/users');
      cy.contains('Forbidden');
    });
  });

  describe('When the user is logged in as a visitor', () => {
    beforeEach(() => {
      cy.logIn('visitor@user.com');
      cy.visit('/en/users');
    });

    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.contains('Forbidden');
    });
  });

  describe('When the user is logged in as an editor', () => {
    beforeEach(() => {
      cy.logIn('editor@user.com');
      cy.visit('/en/users');
    });

    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.contains('Forbidden');
    });
  });

  describe('When the user is logged in as an admin', () => {
    beforeEach(() => {
      cy.logIn('admin@user.com');
      cy.visit('/en/users');
    });

    it('displays the users page', () => {
      cy.contains('Users');
    });

    it('marks the role of each user', () => {
      cy.findByTestId('user-item-visitor@user.com').findByDisplayValue(
        'Visitor',
      );
      cy.findByTestId('user-item-editor@user.com').findByDisplayValue('Editor');
      cy.findByTestId('user-item-admin@user.com').findByDisplayValue('Admin');
    });
  });
});

export {};
