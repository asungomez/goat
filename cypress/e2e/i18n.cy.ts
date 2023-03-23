describe('Internationalization', () => {
  describe('Browser default language detection', () => {
    it('redirects to the english page when the Accept-Language header is en-US', () => {
      cy.visit('/', { headers: { 'Accept-Language': 'en-US' } });
      cy.url().should('include', '/en');
    });

    it('redirects to the spanish page when the Accept-Language header is es-ES', () => {
      cy.visit('/', { headers: { 'Accept-Language': 'es-ES' } });
      cy.url().should('include', '/es');
    });
  });

  describe('Language routes', () => {
    it('shows spanish copy when visiting the spanish page', () => {
      cy.visit('/es');
      cy.contains('Bienvenido a GOAT');
    });

    it('shows english copy when visiting the english page', () => {
      cy.visit('/en');
      cy.contains('Welcome to GOAT');
    });
  });

  describe('Language switch', () => {
    it('redirects to english page when selecting the english language', () => {
      cy.visit('/es');
      cy.findByLabelText('Idioma').click();
      cy.findByText('Inglés').click();
      cy.url().should('include', '/en');
    });

    it('redirects to spanish page when selecting the spanish language', () => {
      cy.visit('/en');
      cy.findByLabelText('Language').click();
      cy.findByText('Spanish').click();
      cy.url().should('include', '/es');
    });
  });
});

export {};
