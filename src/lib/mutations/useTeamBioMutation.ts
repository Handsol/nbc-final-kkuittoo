import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormData, updateTeamBio } from '../services/team-client.services';
import { TeamData } from '@/types/teams.type';
import { QUERY_KEY } from '@/constants/query-key.constants';

export const useTeamBioMutation = (teamId: string, initialBio: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateTeamBio({ teamId, data }),
    onMutate: async (newData) => {
      // 1. 중복 방지를 위한 취소 + 이전 teamBio 저장
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.SINGLE_TEAM, teamId],
      });
      const previousTeamBio = queryClient.getQueryData([
        QUERY_KEY.SINGLE_TEAM,
        teamId,
      ]);

      // 2. optimistic update
      queryClient.setQueryData(
        [QUERY_KEY.SINGLE_TEAM, teamId],
        (prev: TeamData) => ({
          ...prev,
          teamBio: newData.teamBio,
        }),
      );

      // 3. 실패 시 rollback할 수 있도록 이전 상태 리턴
      return { previousTeamBio };
    },
    onError: (error, newData, context) => {
      // 요청 실패 시 이전 상태로 복구
      if (context?.previousTeamBio) {
        queryClient.setQueryData(
          [QUERY_KEY.SINGLE_TEAM, teamId],
          context.previousTeamBio,
        );
      }
      console.error('수정 실패:', error);
    },
    onSettled: () => {
      // 성공/실패 여부 상관없이 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SINGLE_TEAM, teamId],
      });
    },
  });
};
