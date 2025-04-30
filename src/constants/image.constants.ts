export const CONTAINER_SIZE_CLASSES = {
  topRank: 'w-[100px] h-[100px] md:w-[160px] md:h-[160px] z-[50]',
  normalRank: 'w-[100px] h-[100px] md:w-[100px] md:h-[100px]',
  member: 'w-[120px] h-[120px] md:w-[110px] md:h-[110px]',
  sidebar: 'w-[120px] h-[120px] md:w-[150px] md:h-[150px]',
};

export const IMAGE_SIZE_CLASSES = {
  topRank: 'w-[90px] h-[90px] md:w-[150px] md:h-[150px]',
  normalRank: 'w-[90px] h-[90px] md:w-[90px] md:h-[90px]',
  member: 'w-[120px] h-[120px] md:w-[110px] md:h-[110px]',
  sidebar: 'w-[110px] h-[110px] md:w-[150px] md:h-[150px]',
};
export type ProfileImageSize = keyof typeof CONTAINER_SIZE_CLASSES;
