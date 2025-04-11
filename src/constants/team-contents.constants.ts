const TEAM_QUEST_POINTS = {
  LV1: 100,
  LV2: 200,
  LV3: 300,
  LV4: 400,
  LV5: 500,
};

export const TEAM_QUEST = [
  {
    id: 1,
    questName: '팀퀘1',
    questImage: '/assets/images/test01.png',
    requiredPoints: TEAM_QUEST_POINTS.LV1,
  },
  {
    id: 2,
    questName: '팀퀘2',
    questImage: '/assets/images/test01.png',
    requiredPoints: TEAM_QUEST_POINTS.LV2,
  },
  {
    id: 3,
    questName: '팀퀘3',
    questImage: '/assets/images/test01.png',
    requiredPoints: TEAM_QUEST_POINTS.LV3,
  },
  {
    id: 4,
    questName: '팀퀘4',
    questImage: '/assets/images/test01.png',
    requiredPoints: TEAM_QUEST_POINTS.LV4,
  },
  {
    id: 5,
    questName: '팀퀘5',
    questImage: '/assets/images/test01.png',
    requiredPoints: TEAM_QUEST_POINTS.LV5,
  },
] as const;

export const EMBLEM = {
  LION: '/images/emblem-lion.png',
  OWL: '/images/emblem-owl.png',
  CAT: '/images/emblem-cat.png',
  DEER: '/images/emblem-deer.png',
} as const;
