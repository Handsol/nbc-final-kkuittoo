import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 초기 값 설정
    setMatches(media.matches);

    // 변경 핸들러 함수
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // 이벤트 리스너 추가 (최신 방식)
    media.addEventListener('change', handler);

    // 클린업 함수
    return () => media.removeEventListener('change', handler);
  }, [query]); // query만 의존성 배열에 포함

  return matches;
}
