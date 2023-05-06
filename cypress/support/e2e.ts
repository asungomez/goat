import 'cypress-failed-log';
import './commands';
import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { configureAmplify } from '../../src/configureAmplify';
import { Role } from '@/services/usersService';

declare global {
  namespace Cypress {
    interface Chainable {
      createUser(email: string, role?: Role): Chainable<void>;
      deleteUser(email: string): Chainable<void>;
      logIn(email: string): Chainable<void>;
      setUserRole(email: string, role: Role): Chainable<void>;
    }
  }
}

const createUser = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  userPoolId: string,
  group?: string,
): Promise<void> =>
  new Promise((resolve, reject) => {
    cognito.adminCreateUser(
      {
        UserPoolId: userPoolId,
        Username: email,
        TemporaryPassword: '12345678',
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          if (group) {
            cognito.adminAddUserToGroup(
              {
                UserPoolId: userPoolId,
                Username: email,
                GroupName: group,
              },
              (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              },
            );
          } else {
            resolve();
          }
        }
      },
    );
  });

const deleteUser = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  userPoolId: string,
): Promise<void> =>
  new Promise((resolve, reject) => {
    cognito.adminDeleteUser(
      { UserPoolId: userPoolId, Username: email },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });

const getUserGroups = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  userPoolId: string,
): Promise<string[]> =>
  new Promise((resolve, reject) => {
    cognito.adminListGroupsForUser(
      { UserPoolId: userPoolId, Username: email },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          const groups = data?.Groups?.map((group) => group.GroupName).filter(
            Boolean,
          ) as string[] | undefined;
          resolve(groups || []);
        }
      },
    );
  });

const addUserToGroup = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  group: string,
  userPoolId: string,
): Promise<void> =>
  new Promise((resolve, reject) => {
    cognito.adminAddUserToGroup(
      { UserPoolId: userPoolId, Username: email, GroupName: group },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });

const removeUserFromGroup = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  group: string,
  userPoolId: string,
): Promise<void> =>
  new Promise((resolve, reject) => {
    cognito.adminRemoveUserFromGroup(
      { UserPoolId: userPoolId, Username: email, GroupName: group },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });

const setUserGroup = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  group: string,
  userPoolId: string,
): Promise<void> => {
  const groups = await getUserGroups(cognito, email, userPoolId);
  if (!groups?.includes(group)) {
    await addUserToGroup(cognito, email, group, userPoolId);
  }
  const remainingGroups = groups?.filter((g) => g !== group) || [];
  for (const group of remainingGroups) {
    await removeUserFromGroup(cognito, email, group, userPoolId);
  }
};

const deleteAllUserGroups = async (
  cognito: AWS.CognitoIdentityServiceProvider,
  email: string,
  userPoolId: string,
): Promise<void> => {
  const groups = await getUserGroups(cognito, email, userPoolId);
  for (const group of groups) {
    await removeUserFromGroup(cognito, email, group, userPoolId);
  }
};

Cypress.Commands.add('setUserRole', (email, role) => {
  const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
  const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
  const region = Cypress.env('AWS_REGION');
  const userPoolId = Cypress.env('USER_POOL_ID');

  if (!accessKeyId || !secretAccessKey || !region || !userPoolId) {
    const missingEnvVars = [];
    if (!accessKeyId) {
      missingEnvVars.push('CYPRESS_AWS_ACCESS_KEY_ID');
    }
    if (!secretAccessKey) {
      missingEnvVars.push('CYPRESS_AWS_SECRET_ACCESS_KEY');
    }
    if (!region) {
      missingEnvVars.push('CYPRESS_AWS_REGION');
    }
    if (!userPoolId) {
      missingEnvVars.push('CYPRESS_USER_POOL_ID');
    }
    throw new Error('Missing env vars: ' + missingEnvVars.join(', '));
  }

  const log = Cypress.log({
    displayName: 'COGNITO SET USER ROLE',
    message: [`🧔🏻‍♀️ Setting role | ${email} | ${role}`],
    autoEnd: false,
  });
  log.snapshot('before');
  AWS.config.update({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const operation =
    role === 'Visitor'
      ? deleteAllUserGroups(cognito, email, userPoolId)
      : setUserGroup(cognito, email, role, userPoolId);
  cy.wrap(operation, { log: false }).then(() => {
    log.snapshot('after');
    log.end();
  });
});

Cypress.Commands.add('createUser', (email, role = 'Visitor') => {
  const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
  const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
  const region = Cypress.env('AWS_REGION');
  const userPoolId = Cypress.env('USER_POOL_ID');
  if (accessKeyId && secretAccessKey && region && userPoolId) {
    const log = Cypress.log({
      displayName: 'COGNITO CREATE USER',
      message: [`🧔🏻‍♀️ Creating | ${email}`],
      autoEnd: false,
    });

    log.snapshot('before');
    AWS.config.update({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const group = role !== 'Visitor' ? role : undefined;
    const userCreation = createUser(cognito, email, userPoolId, group);
    cy.wrap(userCreation, { log: false }).then(() => {
      log.snapshot('after');
      log.end();
    });
  } else {
    const missingEnvVars = [];
    if (!accessKeyId) {
      missingEnvVars.push('CYPRESS_AWS_ACCESS_KEY_ID');
    }
    if (!secretAccessKey) {
      missingEnvVars.push('CYPRESS_AWS_SECRET_ACCESS_KEY');
    }
    if (!region) {
      missingEnvVars.push('CYPRESS_AWS_REGION');
    }
    if (!userPoolId) {
      missingEnvVars.push('CYPRESS_USER_POOL_ID');
    }
    throw new Error('Missing env vars: ' + missingEnvVars.join(', '));
  }
});

Cypress.Commands.add('deleteUser', (email) => {
  const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
  const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
  const region = Cypress.env('AWS_REGION');
  const userPoolId = Cypress.env('USER_POOL_ID');
  if (accessKeyId && secretAccessKey && region && userPoolId) {
    const log = Cypress.log({
      displayName: 'COGNITO DELETE USER',
      message: [`🧔🏻‍♀️ Deleting | ${email}`],
      autoEnd: false,
    });

    log.snapshot('before');
    AWS.config.update({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const userDeletion = deleteUser(cognito, email, userPoolId);
    cy.wrap(userDeletion, { log: false }).then(() => {
      log.snapshot('after');
      log.end();
    });
  }
});

const setLocalStorage = (cognitoResponse: any) => {
  const storage = JSON.parse(JSON.stringify(cognitoResponse.storage));
  if (storage) {
    for (const key in storage) {
      const value = storage[key];
      if (
        typeof value === 'string' &&
        key.includes('CognitoIdentityServiceProvider')
      ) {
        console.log('Saving to local storage', key);
        window.localStorage.setItem(key, value);
      }
    }
  }
};

Cypress.Commands.add('logIn', (email) => {
  configureAmplify();
  const log = Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  });

  log.snapshot('before');
  const signIn = Auth.signIn({ username: email, password: '12345678' });

  cy.wrap(signIn, { log: false }).then((cognitoResponse: any) => {
    if (cognitoResponse.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const newPassword = cy.wrap(
        Auth.completeNewPassword(cognitoResponse, '12345678'),
      );

      newPassword.then((response) => {
        setLocalStorage(response);
        log.snapshot('after');
        log.end();
      });
    } else {
      setLocalStorage(cognitoResponse);
      log.snapshot('after');
      log.end();
    }
  });
});
