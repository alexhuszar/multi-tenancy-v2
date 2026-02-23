
import { Dashboard } from '../../core/dashboard/Dashboard';

const DashboardPage = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const { id } = await params;

  return <Dashboard key={`folder-${id}`} />;
};

export default DashboardPage;