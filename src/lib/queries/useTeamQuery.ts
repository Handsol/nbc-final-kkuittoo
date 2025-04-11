import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { fetchGetTeams } from '../services/team-client.services';

// 팀 데이터 가져오기 훅
export const useTeamQuery = () => {
  return useQuery({
    // TeamData 배열 반환
    queryKey: QUERY_KEYS.TEAMS,
    queryFn: fetchGetTeams, // fetchGetTeams 호출 데이터 가져오기
  });
  // {data, isPending, isError} 같은 정보 반환
};
