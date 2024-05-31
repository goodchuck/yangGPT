import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { User } from '@/types/fakerJS';
import { fetchUser } from '../apis/api';

export interface UserQueryOptions
  extends Partial<UseQueryOptions<any, any, any>> {
  enabled?: boolean;
}

export const useUserQuery = (
  userId: string,
  options: UserQueryOptions = {},
): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: options.enabled,
    ...options,
  });
};
