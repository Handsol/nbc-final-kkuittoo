export const MAX_EXP = 20;

export const getUserLevel = (points: number) => {
  return Math.floor(points / MAX_EXP) + 1;
};

export const getCurrentExp = (points: number) => {
  return points % MAX_EXP;
};

export const getExpPercent = (points: number) => {
  return (getCurrentExp(points) / MAX_EXP) * 100;
};
