import TeamForm from '@/components/team/TeamForm';

const MakeTeamPage = () => {
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="w-[500px] h-[700px] bg-white rounded-3xl p-3">
        <TeamForm />
      </div>
    </div>
  );
};

export default MakeTeamPage;
