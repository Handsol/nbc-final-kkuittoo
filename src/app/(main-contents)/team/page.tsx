import NoTeam from '@/components/mypage/NoTeam';
import {
  generateTeamMetadata,
  TEAM_METADATA_MODE,
} from '@/lib/seo/generateTeamMetadata';

export const generateMetadata = async () => {
  return await generateTeamMetadata(TEAM_METADATA_MODE.NO_TEAM);
};

const NoTeamPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-sub-light">
      <NoTeam />
    </div>
  );
};

export default NoTeamPage;
