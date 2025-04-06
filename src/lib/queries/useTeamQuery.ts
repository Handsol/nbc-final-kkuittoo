import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { TeamWithPoints } from '@/types/rank-users.type';

const fetchGetTeamsWithPoints = async (): Promise<TeamWithPoints[]> => {
  const response = await fetch('/api/teams/rank', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch teams');
  return response.json();
};
// 팀 데이터 가져오기 훅
export const useTeamQuery = () => {
  return useQuery<TeamWithPoints[]>({
    // TeamData 배열 반환
    queryKey: QUERY_KEYS.TEAMS,
    queryFn: fetchGetTeamsWithPoints, // fetchTeams 호출 데이터 가져오기
  });
  // {data, isPending, isError} 같은 정보 반환
};
