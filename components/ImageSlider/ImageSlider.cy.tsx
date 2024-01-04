import { ImageSlider } from './ImageSlider';

const mountComponent = (images: string[]) => {
  cy.mount(<ImageSlider images={images} />);
};

describe('<ImageSlider />', () => {
  it('renders the first image on mount', () => {
    const images = ['https://via.placeholder.com/600/900'];
    mountComponent(images);
    cy.findByAltText('Image 1').should('exist');
  });

  it('navigates to the next image on button click', () => {
    const images = [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/200',
    ];
    mountComponent(images);
    cy.findByLabelText('Next image').click();
    cy.findByAltText('Image 1').should('not.exist');
    cy.findByAltText('Image 2').should('exist');
  });

  it('navigates to the previous image on button click', () => {
    const images = [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/250',
    ];
    mountComponent(images);
    cy.findByLabelText('Previous image').click();
    cy.findByAltText('Image 3').should('exist');
    cy.findByAltText('Image 1').should('not.exist');
  });
});
