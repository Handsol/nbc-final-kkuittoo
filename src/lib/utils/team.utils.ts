import { TEAM_QUEST } from '@/constants/team-contents.constants';
import { TeamQuest } from '@/types/teams.type';

/**
 * 팀 전체 포인트에 맞는 퀘스트를 정해주는 로직
 *
 * @param teamTotalPoint {number}
 * @returns TeamQuest : 현재 팀퀘스트의 데이터
 */
export const getCurrentTeamQuest = (teamTotalPoints: number): TeamQuest => {
  return (
    TEAM_QUEST.find((quest) => quest.requiredPoints > teamTotalPoints) ??
    TEAM_QUEST[TEAM_QUEST.length - 1]
  );
};
