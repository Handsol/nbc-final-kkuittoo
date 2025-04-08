import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { toast } from '@/hooks/use-toast';
import { fetchUpdateUserProfile } from '../services/user-client.services';

export const useUserProfileMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => fetchUpdateUserProfile({ userId, data }),

    // 1. 중복 방지를 위한 취소 + 이전 user Profile 저장
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.SINGLE_USER(userId),
      });

      const previousUserData = queryClient.getQueryData([
        QUERY_KEYS.SINGLE_USER(userId),
      ]);

      // 2. optimistic update
      queryClient.setQueryData(QUERY_KEYS.SINGLE_USER(userId), (prev: any) => ({
        ...prev,
        ...newData,
      }));

      // 3. 실패 시 rollback을 위한 이전 데이터 리턴
      return { previousUserData };
    },

    // 요청 실패 시 이전 상태로 복구
    onError: (error, newData, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(
          QUERY_KEYS.SINGLE_USER(userId),
          context.previousUserData,
        );
      }
      toast({
        title: '수정 실패',
        description: '프로필 수정 중 문제가 발생했습니다.',
        variant: 'destructive',
      });
    },

    // 성공/실패 여부 상관없이 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SINGLE_USER(userId),
      });
    },

    // 6. 성공 시 토스트 출력
    onSuccess: () => {
      toast({
        title: '수정 완료',
        description: '프로필이 성공적으로 수정되었습니다.',
      });
    },
  });
};
