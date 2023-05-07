import { Role } from '@/services/usersService';

describe('Users management', () => {
  before(() => {
    cy.createUser('visitor@user.com', 'Visitor');
    cy.createUser('editor@user.com', 'Editor');
    cy.createUser('admin@user.com', 'Admin');
    cy.createUser('alternative-admin@user.com', 'Admin');
  });

  after(() => {
    cy.deleteUser('visitor@user.com');
    cy.deleteUser('editor@user.com');
    cy.deleteUser('admin@user.com');
    cy.deleteUser('alternative-admin@user.com');
  });

  describe('When the user is not logged in', () => {
    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.visit('/en/users');
      cy.contains('Forbidden', { timeout: 15000 });
    });
  });

  describe('When the user is logged in as a visitor', () => {
    beforeEach(() => {
      cy.logIn('visitor@user.com');
      cy.visit('/en/users');
    });

    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.contains('Forbidden', { timeout: 15000 });
    });
  });

  describe('When the user is logged in as an editor', () => {
    beforeEach(() => {
      cy.logIn('editor@user.com');
      cy.visit('/en/users');
    });

    it('shows a "Forbidden" error when visiting the users management page', () => {
      cy.contains('Forbidden', { timeout: 15000 });
    });
  });

  describe('When the user is logged in as an admin', () => {
    describe('When the users retrieval succeeds', () => {
      beforeEach(() => {
        cy.logIn('admin@user.com');
      });

      describe('When first visiting the page', () => {
        beforeEach(() => {
          cy.visit('/en/users');
          cy.contains('Users', { timeout: 15000 });
        });
        it('marks the role of each user', () => {
          cy.findByTestId('user-item-visitor@user.com').findByDisplayValue(
            'Visitor',
          );
          cy.findByTestId('user-item-editor@user.com').findByDisplayValue(
            'Editor',
          );
          cy.findByTestId('user-item-admin@user.com').findByDisplayValue(
            'Admin',
          );
        });
      });

      describe('Load more', () => {
        it('renders the Load More button when there are more users', () => {
          cy.intercept(
            {
              pathname: '/**/listUsers',
              method: 'GET',
            },
            {
              statusCode: 200,
              body: {
                Users: [
                  {
                    Username: 'abc',
                    Groups: ['Admin'],
                    Attributes: [{ Name: 'email', Value: 'admin@user.com' }],
                  },
                ],
                NextToken: 'token',
              },
            },
          ).as('listUsers');
          cy.visit('/en/users');
          cy.contains('Users', { timeout: 15000 });
          cy.contains('Load more');
        });

        describe('When the Load More operation succeeds', () => {
          beforeEach(() => {
            cy.intercept(
              {
                pathname: '/**/listUsers',
                method: 'GET',
              },
              {
                statusCode: 200,
                body: {
                  Users: [
                    {
                      Username: 'abc',
                      Groups: ['Admin'],
                      Attributes: [{ Name: 'email', Value: 'admin@user.com' }],
                    },
                  ],
                  NextToken: 'token',
                },
              },
            ).as('listUsers');
            cy.intercept(
              {
                pathname: '/**/listUsers',
                method: 'GET',
                query: {
                  token: 'token',
                },
              },
              {
                statusCode: 200,
                body: {
                  Users: [
                    {
                      Username: 'cde',
                      Groups: ['Editor'],
                      Attributes: [{ Name: 'email', Value: 'editor@user.com' }],
                    },
                  ],
                },
              },
            ).as('loadMore');
            cy.visit('/en/users');
            cy.contains('Users', { timeout: 15000 });
            cy.contains('Load more').click();
          });

          it('hides the Load More button when there are no more users', () => {
            cy.contains('Load more').should('not.exist');
          });

          it('renders a new set of users', () => {
            cy.contains('admin@user.com');
            cy.contains('editor@user.com');
          });
        });

        describe('When the Load More operation fails', () => {
          beforeEach(() => {
            cy.intercept(
              {
                pathname: '/**/listUsers',
                method: 'GET',
              },
              {
                statusCode: 200,
                body: {
                  Users: [
                    {
                      Username: 'abc',
                      Groups: ['Admin'],
                      Attributes: [{ Name: 'email', Value: 'admin@user.com' }],
                    },
                  ],
                  NextToken: 'token',
                },
              },
            ).as('listUsers');
            cy.intercept(
              {
                pathname: '/**/listUsers',
                method: 'GET',
                query: {
                  token: 'token',
                },
              },
              {
                statusCode: 500,
              },
            ).as('loadMore');
            cy.visit('/en/users');
            cy.contains('Users', { timeout: 15000 });
            cy.contains('Load more').click();
          });

          it('renders an error message', () => {
            cy.contains('Load operation failed');
          });
        });
      });

      describe('Search functionality', () => {
        beforeEach(() => {
          cy.visit('/en/users');
          cy.contains('Users', { timeout: 15000 });
        });

        it('shows only the results of the search', () => {
          cy.findByRole('textbox').type('visitor{enter}');
          cy.contains('visitor@user.com');
          cy.should('not.contain', 'editor@user.com');
          cy.should('not.contain', 'admin@user.com');
        });

        it('shows a message when there are no results', () => {
          cy.findByRole('textbox').type('no results{enter}');
          cy.contains('This looks empty');
        });

        it('shows all the results when the search is cleared', () => {
          cy.findByRole('textbox').type('visitor{enter}');
          cy.findByLabelText('Clear').click();
          cy.findByText('Search').click();
          cy.should('not.contain', 'Searching');
          cy.contains('visitor@user.com');
          cy.contains('admin@user.com');
          cy.contains('editor@user.com');
        });

        it('shows an error when the search fails', () => {
          cy.intercept(
            {
              pathname: '/**/listUsers',
              method: 'GET',
              query: { search: 'error' },
            },
            { statusCode: 500 },
          ).as('listUsers');
          cy.findByRole('textbox').type('error{enter}');
          cy.contains('The search operation failed');
        });
      });

      describe('Update user role', () => {
        describe('When the update is successful', () => {
          const changes: { from: Role; to: Role; email: string }[] = [
            {
              from: 'Admin',
              to: 'Editor',
              email: 'alternative-admin@user.com',
            },
            {
              from: 'Admin',
              to: 'Visitor',
              email: 'alternative-admin@user.com',
            },
            {
              from: 'Admin',
              to: 'Admin',
              email: 'alternative-admin@user.com',
            },
            {
              from: 'Editor',
              to: 'Visitor',
              email: 'editor@user.com',
            },
            { from: 'Editor', to: 'Admin', email: 'editor@user.com' },
            { from: 'Editor', to: 'Editor', email: 'editor@user.com' },
            { from: 'Visitor', to: 'Editor', email: 'visitor@user.com' },
            { from: 'Visitor', to: 'Admin', email: 'visitor@user.com' },
            { from: 'Visitor', to: 'Visitor', email: 'visitor@user.com' },
          ];

          changes.forEach(({ from, to, email }) => {
            describe(`From ${from} to ${to}`, () => {
              beforeEach(() => {
                cy.setUserRole(email, from);
                cy.visit('/en/users');
                cy.contains('Users', { timeout: 15000 });
              });

              afterEach(() => {
                cy.setUserRole(email, from);
              });

              it('updates the role', () => {
                cy.findByTestId(`user-item-${email}`)
                  .findByDisplayValue(from)
                  .select(to);
                cy.findByTestId(`user-item-${email}`)
                  .findByDisplayValue(to)
                  .should('exist');
              });
            });
          });
        });

        describe('When the update fails', () => {
          beforeEach(() => {
            cy.intercept(
              {
                path: '/**/setUserGroup',
                method: 'POST',
              },
              { statusCode: 500 },
            ).as('setUserGroup');
            cy.setUserRole('editor@user.com', 'Editor');
            cy.visit('/en/users');
            cy.contains('Users', { timeout: 15000 });
            cy.findByTestId('user-item-editor@user.com')
              .findByDisplayValue('Editor')
              .select('Admin');
          });

          afterEach(() => {
            cy.setUserRole('editor@user.com', 'Editor');
          });
          it('shows an Internal error message', () => {
            cy.contains('The role update failed');
          });
        });
      });
    });

    describe('When the users retrieval fails', () => {
      beforeEach(() => {
        cy.intercept(
          { pathname: '/**/listUsers', method: 'GET' },
          { statusCode: 500 },
        ).as('listUsers');
        cy.logIn('admin@user.com');
        cy.visit('/en/users');
        cy.contains('Users', { timeout: 15000 });
      });

      it('shows an error', () => {
        cy.contains('Something went wrong');
      });
    });
  });
});

export {};
