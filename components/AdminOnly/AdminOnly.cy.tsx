import { AuthContext, AuthContextType } from '@/context/Auth/AuthContext';
import { AdminOnly } from './AdminOnly';

const mountComponent = (
  options: {
    status?: 'checking' | 'authenticated' | 'unauthenticated';
    groups?: ('Admin' | 'Editor')[];
  } = {},
) => {
  const { status, groups } = {
    status: 'checking',
    groups: [],
    ...options,
  };
  const authContext: AuthContextType = {
    authStatus: status as 'checking' | 'authenticated' | 'unauthenticated',
    logOut: cy.stub(),
    user: null,
    isInGroup: (group) => groups.includes(group),
  };
  cy.mount(
    <AuthContext.Provider value={authContext}>
      <AdminOnly>Only for admin eyes</AdminOnly>
    </AuthContext.Provider>,
    { withI18n: true },
  );
};

describe('<AdminOnly />', () => {
  it('renders a loading skeleton if the auth status is checking', () => {
    mountComponent();
    cy.contains('loading');
  });

  it('renders an unauthorized error if the user is unauthenticated', () => {
    mountComponent({ status: 'unauthenticated' });
    cy.contains('forbidden');
  });

  it('renders an unauthorized error if the user is authenticated as a visitor', () => {
    mountComponent({ status: 'authenticated' });
    cy.contains('forbidden');
  });

  it('renders an unauthorized error if the user is authenticated as an editor', () => {
    mountComponent({ status: 'authenticated', groups: ['Editor'] });
    cy.contains('forbidden');
  });

  it('renders the children if the user is authenticated as an admin', () => {
    mountComponent({ status: 'authenticated', groups: ['Admin'] });
    cy.contains('Only for admin eyes');
  });
});
