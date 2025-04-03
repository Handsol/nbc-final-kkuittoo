import MyPageCalendar from '@/components/mypage/MyPageCalendar';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageTeam from '@/components/mypage/MyPageTeam';

const MyPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] min-h-[calc(100vh-3rem)] p-6">
      <div className="flex flex-col md:flex-row gap-6 h-[550px]">
        <div className="flex-[3.5] h-full">
          <MyPageHabits />
        </div>
        <div className="flex-[3.5] h-full">
          <MyPageCalendar />
        </div>
        <div className="flex-[3] h-full">
          <MyPageTeam />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
