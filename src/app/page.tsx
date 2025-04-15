import GoogleLogin from '@/components/login/GoogleLogin';
import HomePageBio from '@/components/home/HomePageBio';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center gap-12">
      <Image
        alt="로고"
        src={'/assets/images/logo_desktop_kkuitddo.png'}
        width={301}
        height={40}
      />
      <HomePageBio />
      <GoogleLogin />
    </div>
  );
}
