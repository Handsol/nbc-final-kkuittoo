import { useQuery } from '@tanstack/react-query';
import { fetchGetTeams } from '../services/team.services';
import { TeamData } from '@/types/teams.type';

// 팀 데이터 가져오기 훅
export const useTeamQuery = () => {
  return useQuery<TeamData[]>({
    // TeamData 배열 반환
    queryKey: ['teams'],
    queryFn: fetchGetTeams, // fetchTeams 호출 데이터 가져오기
  });
  // {data, isPending, isError} 같은 정보 반환
};
