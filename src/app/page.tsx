import HomePaginationController from '@/components/home/HomePaginationController';
import GoogleLogin from '@/components/login/GoogleLogin';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center gap-10 md:gap-12">
      <Image
        alt="로고"
        src={'/assets/images/logo_desktop_kkuitddo.png'}
        width={301}
        height={40}
        className="w-[224px] md:w-[301px] h-auto transition-all duration-300"
        priority
      />
      <HomePaginationController />
      <GoogleLogin />
    </div>
  );
}
