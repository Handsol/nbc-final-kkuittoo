import DashboardHabits from '@/components/dashboard/DashboardHabits';
import DashboardSection from '@/components/dashboard/DashboardSection';
import DashboardTeam from '@/components/dashboard/DashboardTeam';
import UnauthorizedPage from '@/components/loading-error-page/UnauthorizedPage';
import { dashboardMetadata } from '@/lib/seo/dashboard.metadata';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { fetchGetUserHabits } from '@/lib/services/habit-actions.services';
import { fetchGetUserProfile } from '@/lib/services/user-actions.services';
import { Metadata } from 'next';

export const metadata: Metadata = dashboardMetadata;

const Dashboard = async () => {
  const session = await getUserSession();
  if (!session) return <UnauthorizedPage />;

  const userId = session.user.id;
  const { habits, totalHabits } = await fetchGetUserHabits(userId);
  const userProfile = await fetchGetUserProfile(userId);

  const totalPoints =
    userProfile?.userPoints.reduce((sum, p) => sum + p.points, 0) ?? 0;

  return (
    <div className="flex flex-col items-center min-h-full gap-10">
      <DashboardSection label="User teams">
        <DashboardTeam userId={userId} />
      </DashboardSection>
      <DashboardSection label="User habits">
        <DashboardHabits
          userId={userId}
          initialHabits={habits}
          initialTotalHabits={totalHabits}
          initialPoints={totalPoints}
        />
      </DashboardSection>
    </div>
  );
};

export default Dashboard;
