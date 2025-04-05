import { useQuery } from '@tanstack/react-query';
import { fetchGetAllHabits } from '@/lib/services/habit-actions.services';

export const useHabitsQuery = (userId: string) => {
  return useQuery({
    queryKey: ['habits', userId],
    queryFn: () => fetchGetAllHabits(userId),
    enabled: !!userId,
  });
};
