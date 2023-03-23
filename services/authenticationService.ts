import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type CognitoUserWithAttributes = CognitoUser & {
  attributes?: {
    [key: string]: string;
  };
};

export const getAuthenticatedUser =
  async (): Promise<CognitoUserWithAttributes> => {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  };

export const logIn = async () => {
  const credentials = await Auth.federatedSignIn({
    provider: 'Google' as CognitoHostedUIIdentityProvider,
  });
  return credentials;
};

export const logOut = async () => {
  await Auth.signOut();
};
