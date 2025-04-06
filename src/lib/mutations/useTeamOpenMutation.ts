import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeamOpenState } from '../services/team-client.services';
import { QUERY_KEY } from '@/constants/query-key.constants';
import { TeamData } from '@/types/teams.type';

export const useTeamOpenMutation = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isOpened: boolean) =>
      updateTeamOpenState({ teamId, isOpened }),
    onMutate: async (newIsOpened) => {
      // 1. 중복 방지를 위한 취소 + 이전 isOpened 저장
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.SINGLE_TEAM, teamId],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEY.SINGLE_TEAM,
        teamId,
      ]);

      // 2. optimistic update
      queryClient.setQueryData(
        [QUERY_KEY.SINGLE_TEAM, teamId],
        (prev: TeamData) => ({
          ...prev,
          isOpened: newIsOpened,
        }),
      );

      // 3. 실패 시 rollback할 수 있도록 이전 상태 리턴
      return { previousData };
    },
    onError: (err, newIsOpened, context) => {
      // 요청 실패 시 이전 상태로 복구
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEY.SINGLE_TEAM, teamId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      // 성공/실패 여부 상관없이 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SINGLE_TEAM, teamId],
      });
    },
  });
};
