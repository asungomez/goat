import awsConfig from './aws-exports';
import { Amplify } from 'aws-amplify';

export const configureAmplify = (locale: 'es' | 'en' = 'es') => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const signIn = `${baseUrl}/${locale}/`;
  const signOut = `${baseUrl}/${locale}/`;
  const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
      ...awsConfig.oauth,
      redirectSignIn: signIn,
      redirectSignOut: signOut,
    },
  };
  Amplify.configure(updatedAwsConfig);
};
