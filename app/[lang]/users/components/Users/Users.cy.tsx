import { Users } from './Users';
import { API, Auth } from 'aws-amplify';
import { UserResponse } from '@/services/usersService';

const mountComponent = (users: UserResponse[] = []) => {
  cy.stub(Auth, 'currentSession').resolves({
    getAccessToken: () => ({
      getJwtToken: () => 'token',
    }),
  });
  cy.stub(API, 'get').returns({ Users: users });
  cy.mount(<Users />, { withI18n: true });
};

describe('<Users />', () => {
  it('shows all users if there are less than 10', () => {
    mountComponent([
      {
        Username: '1',
        Attributes: [{ Value: 'admin@user.com', Name: 'email' }],
        Groups: ['Admin'],
      },
      {
        Username: '2',
        Attributes: [{ Value: 'editor@user.com', Name: 'email' }],
        Groups: ['Editor'],
      },
      {
        Username: '1',
        Attributes: [{ Value: 'visitor@user.com', Name: 'email' }],
        Groups: [],
      },
    ]);
    cy.contains('admin@user.com');
    cy.contains('editor@user.com');
    cy.contains('visitor@user.com');
  });

  it('selects the option "admin" if a user is in the group "Admin"', () => {
    mountComponent([
      {
        Username: '1',
        Attributes: [{ Value: 'admin@user.com', Name: 'email' }],
        Groups: ['Admin'],
      },
    ]);
    cy.findByDisplayValue('admin');
  });

  it('selects the option "editor" if a user is in the group "Editor"', () => {
    mountComponent([
      {
        Username: '1',
        Attributes: [{ Value: 'editor@user.com', Name: 'email' }],
        Groups: ['Editor'],
      },
    ]);
    cy.findByDisplayValue('editor');
  });

  it('selects the option "visitor" if a user is not in any group', () => {
    mountComponent([
      {
        Username: '1',
        Attributes: [{ Value: 'visitor@user.com', Name: 'email' }],
        Groups: [],
      },
    ]);
    cy.findByDisplayValue('visitor');
  });

  it('displays a "Not Results" error when the search has no results', () => {
    cy.stub(Auth, 'currentSession').resolves({
      getAccessToken: () => ({
        getJwtToken: () => 'token',
      }),
    });
    cy.stub(API, 'get')
      .onFirstCall()
      .returns({
        Users: [
          {
            Username: '1',
            Attributes: [{ Value: 'visitor@user.com', Name: 'email' }],
            Groups: [],
          },
        ],
      })
      .onSecondCall()
      .returns({ Users: [] });
    cy.mount(<Users />, { withI18n: true });
    cy.findByRole('textbox').type('some query{enter}');
    cy.contains('empty-message');
  });
});
