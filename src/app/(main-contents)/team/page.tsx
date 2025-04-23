import NoTeam from '@/components/dashboard/NoTeam';
import {
  generateTeamMetadata,
  TEAM_METADATA_MODE,
} from '@/lib/seo/generateTeamMetadata';

export const generateMetadata = async () => {
  return await generateTeamMetadata(TEAM_METADATA_MODE.NO_TEAM);
};

const NoTeamPage = () => {
  return (
    //모바일 스크롤 방지를 위해 min-h-[calc(100vh-98px)] 추가
    <div className="w-full min-h-[calc(100vh-98px)] md:min-h-screen flex justify-center items-center bg-sub-light">
      <NoTeam />
    </div>
  );
};

export default NoTeamPage;
