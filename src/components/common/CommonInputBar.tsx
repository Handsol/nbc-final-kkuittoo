import { forwardRef } from 'react';

type InputBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
};

/**
 * 공통 input 컴포넌트 : react-hook-form 사용 가능
 *
 * forwardRef : 커스텀 컴포넌트에서 사용하는 input 태그의 ref를 부모 컴포넌트로 전달하여 register 함수를 사용할 수 있게 하는 방법
 *
 * @param id {string} : input 요소의 고유 ID
 * @param placeholder {string} : 입력창에 표시될 placeholder 텍스트
 * @param ref {React.Ref<HTMLInputElement>}  : 외부에서 전달되는 input의 참조 객체 (forwardRef)
 * @param {...rest} : react-hook-form에서 넘어오는 인자들()
 *
 * @example
 * <CommonInputBar
 *   id="teamBio"
 *   placeholder="팀 소개를 입력하세요"
 *   {...register('teamBio')}
 * />
 */
const CommonInputBar = forwardRef<HTMLInputElement, InputBarProps>(
  ({ id, placeholder, ...rest }, ref) => {
    return (
      <input
        className="w-full h-7 rounded-full px-4 py-1 bg-light-gray font-pretendard text-body-sm"
        id={id}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default CommonInputBar;
