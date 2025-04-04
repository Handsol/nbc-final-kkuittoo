import MyPageCalendar from '@/components/mypage/MyPageCalendar';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import MyPageTeam from '@/components/mypage/MyPageTeam';

const MyPage = () => {
  return (
    <div className="flex flex-col items-center px-2 py-6 min-h-[calc(100vh-3rem)] gap-10">
      <div className="w-[740px] flex gap-6">
        <div className="w-[430px] h-[640px]">
          <MyPageHabits />
        </div>

        <div className="w-[310px] h-[640px] flex flex-col gap-4">
          <MyPageProfile />
          <div className="flex-[3]">
            <MyPageCalendar />
          </div>
        </div>
      </div>

      <div className="w-[740px]">
        <MyPageTeam />
      </div>
    </div>
  );
};

export default MyPage;
