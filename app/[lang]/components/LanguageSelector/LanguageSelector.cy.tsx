import { I18nContext } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
import * as NextNavigation from 'next/navigation';
import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

const createRouter = (params: Partial<AppRouterInstance> = {}) => ({
  back: cy.spy().as('back'),
  forward: cy.spy().as('forward'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  replace: cy.spy().as('replace'),
  refresh: cy.spy().as('refresh'),
  ...params,
});

const mountComponent = (
  language: ValidLanguage = 'en',
  pathname: string = '/',
) => {
  cy.stub(NextNavigation, 'usePathname').returns(pathname);
  const router = createRouter();
  cy.mount(
    <AppRouterContext.Provider value={router}>
      <I18nContext.Provider
        value={{ currentLanguage: language, t: (key) => key }}
      >
        <LanguageSelector />
      </I18nContext.Provider>
    </AppRouterContext.Provider>,
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
    cy.get('@push').should('be.calledWith', '/en/root');
  });

  it('redirects to the spanish site when selecting spanish if the current language is english', () => {
    mountComponent('en');
    cy.findByLabelText('language').click();
    cy.findByText('es').click();
    cy.get('@push').should('be.calledWith', '/es/root');
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
});
