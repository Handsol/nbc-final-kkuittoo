import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewSample } from '../services/sampleServices';

const queryClient = useQueryClient();

export const addSampleMutation = () => {
  const addMutation = useMutation({
    mutationFn: addNewSample,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SAMPLE],
      });
    },
  });

  return addMutation;
};
