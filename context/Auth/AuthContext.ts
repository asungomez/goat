import { CognitoUserWithAttributes } from '@/services/authenticationService';
import { createContext, useContext } from 'react';

export type AuthContextType = {
  authStatus: 'checking' | 'authenticated' | 'unauthenticated';
  logOut: () => Promise<void>;
  user: CognitoUserWithAttributes | null;
  isInGroup: (group: Group) => boolean;
};

export const AuthContext = createContext<AuthContextType>({
  authStatus: 'checking',
  logOut: async () => {},
  user: null,
  isInGroup: () => false,
});

const groups = ['Admin', 'Editor'] as const;
export type Group = (typeof groups)[number];

export const useAuth = () => useContext(AuthContext);
