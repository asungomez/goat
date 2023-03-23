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
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add(
  'mount',
  (
    jsx: ReactNode,
    options?: MountOptions,
    rerenderKey?: string,
  ): Cypress.Chainable<MountReturn> =>
    mount(<ChakraProvider>{jsx}</ChakraProvider>, options, rerenderKey),
);
