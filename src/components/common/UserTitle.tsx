import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { ReactNode } from 'react';

type UserTitleProps = {
  mode: number;
  children: string | ReactNode;
  className?: string;
};

/**
 * UserTitle : 유저 정보 표시를 위한 타이틀 컴포넌트
 * ⚠️ import시 경로 주의해주세요!
 *
 * 1. mode
 * USER_TITLE_MODE.CARD_LEVEL => 유저, 팀 레벨
 * USER_TITLE_MODE.CARD_NAME => 유저 닉네임, 팀 네임
 * USER_TITLE_MODE.CARD_RANK => 유저, 팀 랭크
 * USER_TITLE_MODE.CARD_ID => 유저, 팀 고유 아이디
 *
 * 3. children
 * 텍스트
 *
 * @param mode number;
 * @param children {string | ReactNode}
 * @param className {string} : ⚠️size관련 클래스만 넣어주세요!
 * @returns
 *
 * @example
 * <UserTitle mode={USERTITLE_MODE.CARD_NAME}>
 *    User NickName
 * </UserTitle>
 *
 * <UserTitle mode={USERTITLE_MODE.CARD_ID}>
 *    @5728cd89
 * </UserTitle>
 */

const UserTitle = ({ mode, children, className = '' }: UserTitleProps) => {
  switch (mode) {
    case USER_TITLE_MODE.CARD_LEVEL:
      return <h5 className={`font-dohyeon ${className}`}>{children}</h5>;
    case USER_TITLE_MODE.CARD_NAME:
      return (
        <h5 className={`font-dohyeon truncate ${className}`}>{children}</h5>
      );
    case USER_TITLE_MODE.CARD_RANK:
      return <h5 className="font-dohyeon text-dark-gray">{children}</h5>;
    case USER_TITLE_MODE.CARD_ID:
      return (
        <h6 className="font-pretendard text-base text-medium-gray">
          {children}
        </h6>
      );
    default:
      return <span>{children}</span>; // fallback
  }
};

export default UserTitle;
