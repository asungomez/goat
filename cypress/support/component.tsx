import { AuthProvider } from '@/context/Auth/AuthProvider';
import { I18nProvider } from '@/context/I18n/I18nProvider';
import { dictionaries } from '@/dictionaries';
import { ChakraProvider } from '@chakra-ui/react';
import { mount, MountOptions, MountReturn } from 'cypress/react18';
import React from 'react';
import { ReactNode } from 'react';
import './commands';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: (
        jsx: ReactNode,
        environment?: MountEnvironment,
        options?: MountOptions,
        rerenderKey?: string,
      ) => Cypress.Chainable<MountReturn>;
    }
  }
}
type MountEnvironment = {
  withI18n?: boolean;
  withAuth?: boolean;
};
Cypress.Commands.add(
  'mount',
  (
    jsx: ReactNode,
    environment?: MountEnvironment,
    options?: MountOptions,
    rerenderKey?: string,
  ): Cypress.Chainable<MountReturn> => {
    const { withAuth, withI18n }: MountEnvironment = {
      withAuth: false,
      withI18n: false,
      ...environment,
    };
    let mounted = <ChakraProvider>{jsx}</ChakraProvider>;
    if (withAuth) {
      mounted = <AuthProvider>{mounted}</AuthProvider>;
    }
    if (withI18n) {
      mounted = (
        <I18nProvider dictionaries={dictionaries}>{mounted}</I18nProvider>
      );
    }
    return mount(mounted, options, rerenderKey);
  },
);
