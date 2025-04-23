export const DELETE_DIALOG_CONTENTS = {
  uiButtonText: 'Delete',
  title: '습관 삭제',
  description:
    '이 습관을 정말 삭제하시겠습니까? 삭제된 습관은 복구할 수 없습니다.',
  cancelButtonText: '취소',
  confirmButtonText: '삭제하기',
};

export const POINT_DIALOG_CONTENTS = {
  uiButtonText: '포인트 추가',
  title: '포인트 추가 확인',
  description: (days: string) =>
    `이 습관은 ${days} 요일에 수행할 수 있으며, 포인트를 추가한 지 1시간이 지나야 합니다. 
     하루 최대 10포인트까지 추가할 수 있습니다. 추가하시겠습니까?`,
  cancelButtonText: '취소',
  confirmButtonText: '추가',
};
