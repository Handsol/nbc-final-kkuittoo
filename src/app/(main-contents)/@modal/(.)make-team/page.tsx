import TeamForm from '@/components/team/TeamForm';

const MakeTeamModal = async () => {
  return (
    // 공통 컴포넌트 구현완료 후 리팩토링 예정입니다
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="w-[500px] h-[700px] bg-white rounded-3xl p-3">
        <TeamForm />
      </div>
    </div>
  );
};

export default MakeTeamModal;
