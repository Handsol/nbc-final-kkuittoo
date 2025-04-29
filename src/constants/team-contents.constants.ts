import { IMAGE_ASSETS } from './assets.constants';

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
    questName: 'TUAKKI',
    questImage: IMAGE_ASSETS.TEAM_QUEST.LV1,
    requiredPoints: TEAM_QUEST_POINTS.LV1,
  },
  {
    id: 2,
    questName: 'BLINGO',
    questImage: IMAGE_ASSETS.TEAM_QUEST.LV2,
    requiredPoints: TEAM_QUEST_POINTS.LV2,
  },
  {
    id: 3,
    questName: 'WOOANG',
    questImage: IMAGE_ASSETS.TEAM_QUEST.LV3,
    requiredPoints: TEAM_QUEST_POINTS.LV3,
  },
  {
    id: 4,
    questName: 'FRIZZY',
    questImage: IMAGE_ASSETS.TEAM_QUEST.LV4,
    requiredPoints: TEAM_QUEST_POINTS.LV4,
  },
  {
    id: 5,
    questName: 'YONGYONG',
    questImage: IMAGE_ASSETS.TEAM_QUEST.LV5,
    requiredPoints: TEAM_QUEST_POINTS.LV5,
  },
] as const;

export const EMBLEM = {
  LION: IMAGE_ASSETS.EMBLEM.LION,
  OWL: IMAGE_ASSETS.EMBLEM.OWL,
  CAT: IMAGE_ASSETS.EMBLEM.CAT,
  DEER: IMAGE_ASSETS.EMBLEM.DEER,
} as const;
