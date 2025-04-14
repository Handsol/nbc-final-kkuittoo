import { LEVELS } from '@/constants/profile.constants';

export const getUserImageByLevel = (level: number): string => {
  if (level >= LEVELS.LV5) return '/assets/images/user_lv5.png';
  if (level >= LEVELS.LV4) return '/assets/images/user_lv4.png';
  if (level >= LEVELS.LV3) return '/assets/images/user_lv3.png';
  if (level >= LEVELS.LV2) return '/assets/images/user_lv2.png';
  return '/assets/images/user_lv1.png';
};
