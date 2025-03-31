import { useQuery } from '@tanstack/react-query';
import { fetchSample } from '../services/sampleServices';

export const useSampleQuery = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEYS.SAMPLE],
    queryFn: fetchSample,
  });

  return { data, isPending, isError };
};
