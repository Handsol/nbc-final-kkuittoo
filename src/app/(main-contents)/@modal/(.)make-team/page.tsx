import TeamForm from '@/components/team/team-create/TeamForm';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';

const MakeTeamModal = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <p className="text-lg">로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="w-[500px] h-[700px] bg-white rounded-3xl p-3">
        <TeamForm userId={session.user.id} />
      </div>
    </div>
  );
};

export default MakeTeamModal;
