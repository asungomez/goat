import { listUsers, User } from '@/services/usersService';
import useSWR from 'swr';

export const useUsers = () => {
  const { data: users, ...rest } = useSWR<User[]>('listUsers', listUsers);
  return { users, ...rest };
};
