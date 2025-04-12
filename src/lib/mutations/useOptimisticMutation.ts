import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

/**
 * 낙관적 업데이트(Optimistic Update)를 위한 커스텀 훅
 * @param options.queryKey - 캐시에서 조회할 query key
 * @param options.mutationFn - 실제 API 호출 함수 (Promise를 반환해야 함)
 * @param options.onMutateOptimistic - 낙관적 업데이트를 적용할 로직
 */
export const useOptimisticMutation = <
  ApiResponse, // 실제 API 요청이 성공했을 때 서버가 반환하는 데이터의 타입
  Input, // API 요청을 보낼 때 사용하는 입력값의 타입
  CacheData = ApiResponse, // 캐시에 저장된 데이터의 타입 (기본값: ApiResponse)
>(options: {
  queryKey: QueryKey;
  mutationFn: (input: Input) => Promise<ApiResponse>;
  onMutateOptimistic: (
    input: Input,
    previousData: CacheData | undefined,
  ) => CacheData;
  onSuccess?: (
    data: ApiResponse,
    variables: Input,
    queryClient: ReturnType<typeof useQueryClient>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, Input, { previousData?: CacheData }>({
    // 실제 API 요청 함수
    mutationFn: options.mutationFn,

    // mutation 호출 직전에 실행됨
    onMutate: async (input) => {
      // 해당 queryKey에 대한 쿼리 중단
      await queryClient.cancelQueries({ queryKey: options.queryKey });

      // 이전 캐시 데이터 가져오기
      const previousData = queryClient.getQueryData<CacheData>(
        options.queryKey,
      );

      // 낙관적 업데이트된 값으로 캐시를 업데이트
      queryClient.setQueryData<CacheData>(options.queryKey, (old) =>
        options.onMutateOptimistic(input, old),
      );

      // 실패 시 복원할 수 있도록 이전 데이터 반환
      return { previousData };
    },

    //api 요청 실패할 때 실행
    onError: (_error, _input, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(options.queryKey, context.previousData);
      }
    },

    //요청 실패하든 성공하든 실행
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
    },

    // API 요청 성공 시 실행
    onSuccess: (data, variables) => {
      options.onSuccess?.(data, variables, queryClient);
    },
  });
};
