import clsx from 'clsx';

export const getTabButtonClass = (isActive: boolean) =>
  clsx(
    'w-full flex-1 pb-[8px] border-b-4 font-dohyeon text-center transition-all duration-200 ease-in-out',
    isActive
      ? 'border-main text-main font-semibold'
      : 'border-light-gray text-dark-gray hover:text-sub hover:border-sub',
  );
