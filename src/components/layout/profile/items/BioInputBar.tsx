'use client';

import { forwardRef } from 'react';

type BioInputBarProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
};

const BioInputBar = forwardRef<HTMLTextAreaElement, BioInputBarProps>(
  ({ id, placeholder, ...rest }, ref) => {
    return (
      <textarea
        id={id}
        ref={ref}
        placeholder={placeholder}
        className="w-full h-20 resize-none rounded-xl px-4 py-2 bg-light-gray font-pretendard text-body-sm"
        {...rest}
      />
    );
  },
);

BioInputBar.displayName = 'BioInputBar';

export default BioInputBar;
