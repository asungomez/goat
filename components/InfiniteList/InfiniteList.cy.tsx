import { InfiniteList } from './InfiniteList';

describe('<InfiniteList />', () => {
  it('renders the items received in a list', () => {
    cy.mount(
      <InfiniteList
        items={[
          <div key="first">First item</div>,
          <div key="second">Second item</div>,
        ]}
      />,
    );
    cy.contains('First item');
    cy.contains('Second item');
  });

  it('renders the Load More link when the hasMore prop is set to true and loading is false', () => {
    cy.mount(
      <InfiniteList
        items={[
          <div key="first">First item</div>,
          <div key="second">Second item</div>,
        ]}
        hasMore
      />,
      { withI18n: true },
    );
    cy.contains('load-more');
  });

  it('renders the Loading text when the hasMore prop is set to true and loading is true', () => {
    cy.mount(
      <InfiniteList
        items={[
          <div key="first">First item</div>,
          <div key="second">Second item</div>,
        ]}
        hasMore
        loading
      />,
      { withI18n: true },
    );
    cy.contains('loading');
  });

  it('calls the onLoadMore callback when the Load More link is clicked', () => {
    cy.mount(
      <InfiniteList
        items={[
          <div key="first">First item</div>,
          <div key="second">Second item</div>,
        ]}
        hasMore
        onLoadMore={cy.spy().as('loadMoreHandler')}
      />,
      { withI18n: true },
    );
    cy.findByText('load-more').click();
    cy.get('@loadMoreHandler').should('have.been.called');
  });

  it('renders an empty message when the list of items is empty', () => {
    cy.mount(<InfiniteList items={[]} />, { withI18n: true });
    cy.contains('empty-message');
  });
});
