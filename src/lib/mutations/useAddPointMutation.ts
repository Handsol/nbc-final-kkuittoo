import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => fetchAddUserPoint(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HABITS(userId),
      });
    },
  });
};
