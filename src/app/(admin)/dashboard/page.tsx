import { getSales } from '@/lib/actions';
import Dashboard from '@/components/dashboard';

export default function DashboardPage() {
  return <Dashboard getSales={getSales} />;
}
