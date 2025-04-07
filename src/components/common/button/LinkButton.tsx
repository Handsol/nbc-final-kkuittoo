import Link from 'next/link';

type LinkButtonProps = {
  href: string;
  mode: string;
  children: string;
};

const LinkButton = ({ href, mode, children }: LinkButtonProps) => {
  return (
    <>
      {mode === 'nav' ? (
        // nav 모드
        <Link href={href}>
          <button className="px-5 py-2 duration-200 hover:bg-slate-500">
            {children}
          </button>
        </Link>
      ) : (
        // common 모드
        <Link href={href}>
          <button className="px-5 py-2 bg-white rounded-full">
            {children}
          </button>
        </Link>
      )}
    </>
  );
};

export default LinkButton;
