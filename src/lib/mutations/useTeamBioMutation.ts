import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUpdateTeamBio,
  TeamFormData,
} from '../services/team-client.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';

export const useTeamBioMutation = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamFormData) => fetchUpdateTeamBio({ teamId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SINGLE_TEAM(teamId),
      });
    },
    onError: (error) => {
      console.error(`${TEAMS_MESSAGES.UPDATE_FAILED}-teamBio`, error);
    },
  });
};
