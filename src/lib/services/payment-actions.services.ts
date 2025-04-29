// 모든 아이템 다 가져오기
export const fetchGetItemList = async () => {
  try {
    const res = await fetch('/api/items');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || '아이템 목록 불러오기 실패');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`아이템 목록 불러오기 실패 : ${error}`);
  }
};

// 구매한 아이템 목록 가져오기
export const fetchGetPurchasedItemList = async () => {
  try {
    const res = await fetch('/api/items/purchased-items', {
      cache: 'no-store',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || '구매 아이템 목록 불러오기 실패');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`구매 아이템 목록 불러오기 실패 : ${error}`);
  }
};

// 구매하지 않은 아이템 목록 가져오기
export const fetchGetNotPurchasedItemList = async () => {
  try {
    const res = await fetch('/api/items/not-purchased-items');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || '미구매 아이템 목록 불러오기 실패');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`미구매 아이템 목록 불러오기 실패 : ${error}`);
  }
};

// 아이템 적용 상태 변경하기
export const fetchPatchApplyItem = async (userItemId: string) => {
  try {
    const res = await fetch(`/api/user-items/${userItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isApplied: true }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || `ID: ${userItemId} 아이템 적용 실패`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`아이템 적용 실패: ${error}`);
  }
};
