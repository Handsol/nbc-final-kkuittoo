import HomePaginationController from '@/components/home/HomePaginationController';
import GoogleLogin from '@/components/login/GoogleLogin';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-sub flex flex-col items-center justify-center pt-2 gap-8">
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
