import { I18nContext } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
import * as NextNavigation from 'next/navigation';
import React from 'react';
import { LanguageSelector } from './LanguageSelector';

const mountComponent = (
  language: ValidLanguage = 'en',
  pathname: string = '/',
) => {
  const stubbedRouter = {
    push: cy.spy().as('push'),
  };
  cy.stub(NextNavigation, 'useRouter').returns(stubbedRouter);
  cy.stub(NextNavigation, 'usePathname').returns(pathname);
  cy.mount(
    <I18nContext.Provider
      value={{ currentLanguage: language, t: (key) => key }}
    >
      <LanguageSelector />
    </I18nContext.Provider>,
  );
};

describe('<LanguageSelector />', () => {
  it('renders', () => {
    mountComponent();
  });

  it('opens the menu when clicking the toggle button', () => {
    mountComponent();
    cy.findByLabelText('language').click();
    cy.contains('es');
    cy.contains('en');
  });

  it('redirects to the english site when selecting english if the current language is spanish', () => {
    mountComponent('es');
    cy.findByLabelText('language').click();
    cy.findByText('en').click();
    cy.get('@push').should('be.calledWith', '/en/');
  });

  it('redirects to the spanish site when selecting spanish if the current language is english', () => {
    mountComponent('en');
    cy.findByLabelText('language').click();
    cy.findByText('es').click();
    cy.get('@push').should('be.calledWith', '/es/');
  });

  it('does not redirect if the site is in english and the english language is selected', () => {
    mountComponent('en');
    cy.findByLabelText('language').click();
    cy.findByText('en').click();
    cy.get('@push').should('not.be.called');
  });

  it('does not redirect if the site is in spanish and the spanish language is selected', () => {
    mountComponent('es');
    cy.findByLabelText('language').click();
    cy.findByText('es').click();
    cy.get('@push').should('not.be.called');
  });

  it('redirects to /users if selecting english from /usuarios page', () => {
    mountComponent('es', '/es/usuarios');
    cy.findByLabelText('language').click();
    cy.findByText('en').click();
    cy.get('@push').should('be.calledWith', '/en/users');
  });

  it('redirects to /usuarios if selecting spanish from /users page', () => {
    mountComponent('en', '/en/users');
    cy.findByLabelText('language').click();
    cy.findByText('es').click();
    cy.get('@push').should('be.calledWith', '/es/usuarios');
  });
});
