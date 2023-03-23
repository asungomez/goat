import { I18nContext } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
import * as NextNavigation from 'next/navigation';
import React from 'react';
import { LanguageSelector } from './LanguageSelector';
const stubbedRouter = {
  push: (pathname: string) => pathname,
};

const mountComponent = (language: ValidLanguage) => {
  cy.spy(stubbedRouter, 'push');
  cy.stub(NextNavigation, 'useRouter').returns(stubbedRouter);
  cy.stub(NextNavigation, 'usePathname').returns('/');
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
    mountComponent('en');
  });
});
