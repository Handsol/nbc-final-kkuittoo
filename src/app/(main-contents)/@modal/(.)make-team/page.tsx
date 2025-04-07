import TeamForm from '@/components/team/team-create/TeamForm';

const MakeTeamModal = async () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="w-[500px] h-[700px] bg-white rounded-3xl p-3">
        <TeamForm />
      </div>
    </div>
  );
};

export default MakeTeamModal;
