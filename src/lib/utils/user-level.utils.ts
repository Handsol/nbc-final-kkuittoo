export const MAX_EXP = 10; // 20 -> 10으로 변경

export const getUserLevel = (points: number) => {
  return Math.floor(points / MAX_EXP) + 1;
};

export const getCurrentExp = (points: number) => {
  return points % MAX_EXP;
};

export const getExpPercent = (points: number) => {
  return (getCurrentExp(points) / MAX_EXP) * 100;
};
