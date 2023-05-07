import { Role, User } from '@/services/usersService';
import { createContext, useContext } from 'react';

const errorTypes = [
  'FAILED_TO_FETCH',
  'FAILED_TO_SEARCH',
  'FAILED_TO_LOAD_MORE',
] as const;
export type UsersManagementErrorType = (typeof errorTypes)[number];

type UsersManagementContextType = {
  users: User[];
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  search: (email: string) => void;
  isLoadingMore: boolean;
  isSearching: boolean;
  changeRole: (id: string, role: Role) => Promise<void>;
  error: UsersManagementErrorType | null;
};

export const UsersManagementContext = createContext<UsersManagementContextType>(
  {
    users: [],
    hasMore: false,
    loadMore: () => {},
    isLoading: false,
    search: () => {},
    isLoadingMore: false,
    isSearching: false,
    changeRole: async () => {},
    error: null,
  },
);

export const useUsers = () => useContext(UsersManagementContext);
