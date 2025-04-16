import TeamForm from '@/components/team/TeamForm';

const MakeTeamModal = async () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center">
      <article className="bg-white rounded-3xl px-8 py-12 absolute">
        <TeamForm />
      </article>
    </div>
  );
};

export default MakeTeamModal;
