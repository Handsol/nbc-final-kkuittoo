export const getUserImageByLevel = (level: number): string => {
  if (level >= 40) return '/assets/images/user_lv5.png';
  if (level >= 30) return '/assets/images/user_lv4.png';
  if (level >= 20) return '/assets/images/user_lv3.png';
  if (level >= 10) return '/assets/images/user_lv2.png';
  return '/assets/images/user_lv1.png';
};
