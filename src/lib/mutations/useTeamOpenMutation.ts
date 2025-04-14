import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { fetchUpdateTeamOpenState } from '../services/team-client.services';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';

export const useTeamOpenMutation = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isOpened: boolean) =>
      fetchUpdateTeamOpenState({ teamId, isOpened }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SINGLE_TEAM(teamId),
      });
    },
    onError: (error) => {
      console.error(`${TEAMS_MESSAGES.UPDATE_FAILED}-isOpened`, error);
    },
  });
};
