import { useAmplify } from '@/hooks/useAmplify';
import {
  CognitoUserWithAttributes,
  getAuthenticatedUser,
  logOut as logOutRequest,
} from '@/services/authenticationService';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<
    'checking' | 'authenticated' | 'unauthenticated'
  >('checking');
  const [user, setUser] = useState<CognitoUserWithAttributes | null>(null);
  useAmplify();

  useEffect(() => {
    if (authStatus === 'checking') {
      getAuthenticatedUser()
        .then((user) => {
          setUser(user);
          setAuthStatus('authenticated');
        })
        .catch(() => {
          setAuthStatus('unauthenticated');
        });
    }
  }, [authStatus]);

  const logOut = async () => {
    await logOutRequest();
    setAuthStatus('unauthenticated');
  };

  const isInGroup = useCallback(
    (group: string): boolean => {
      if (!user) {
        return false;
      }
      const session = user.getSignInUserSession();
      if (!session) {
        return false;
      }
      const accessToken = session.getAccessToken();
      if (!accessToken) {
        return false;
      }
      const payload = accessToken.decodePayload();
      if (!payload) {
        return false;
      }
      const groups = payload['cognito:groups'];
      if (!groups || !Array.isArray(groups) || !groups.length) {
        return false;
      }
      return groups.includes(group);
    },
    [user],
  );

  const authContext: AuthContextType = useMemo(
    () => ({ authStatus, logOut, user, isInGroup }),
    [authStatus, user, isInGroup],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
