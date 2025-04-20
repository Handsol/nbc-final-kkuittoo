// 포디움 스타일 (공통)
export const podiumBaseStyle =
  'relative rounded-t-md bg-gradient-to-b from-main to-white flex items-center justify-center animate-fade-up';

// 상단면 공통 스타일
export const podiumTopFaceBaseStyle = 'absolute top-0 left-0 w-full';
export const podiumTopFaceInnerStyle =
  'bg-sub rounded-t-md transform rotate-x-70 transform-origin-bottom backface-hidden';

// 카드 전체 컨테이너
export const rankCardContainer = 'flex flex-col items-center';

// 유저/팀 정보 영역
export const rankCardInfoWrapper = 'flex flex-col items-center mb-2';

// 애니메이션
export const floatAnimation = {
  animate: { y: [0, -4, 0] },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
