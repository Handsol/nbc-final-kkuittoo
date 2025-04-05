import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUserPoint } from '../services/user-points.services';

export const useAddPointMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => addUserPoint(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits', userId],
      });
    },
  });
};
