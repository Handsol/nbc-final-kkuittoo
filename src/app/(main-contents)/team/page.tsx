import NoTeam from '@/components/dashboard/NoTeam';
import UnauthorizedPage from '@/components/loading-error-page/UnauthorizedPage';
import {
  generateTeamMetadata,
  TEAM_METADATA_MODE,
} from '@/lib/seo/generateTeamMetadata';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import { redirect } from 'next/navigation';

export const generateMetadata = async () => {
  return await generateTeamMetadata(TEAM_METADATA_MODE.NO_TEAM);
};

const NoTeamPage = async () => {
  const session = await getUserSession();

  if (!session) {
    return <UnauthorizedPage />;
  }
  const userId = session.user.id;

  const myTeamData = await fetchGetMyTeamData(userId);

  if (myTeamData?.team?.id) {
    redirect(`/team/${myTeamData.team.id}`);
  }

  return (
    //모바일 스크롤 방지를 위해 min-h-[calc(100vh-98px)] 추가
    <div className="w-full min-h-[calc(100vh-98px)] md:min-h-screen flex justify-center items-center bg-sub-light">
      <NoTeam />
    </div>
  );
};

export default NoTeamPage;
