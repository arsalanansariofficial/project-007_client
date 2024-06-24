import './main.css';
import Home from '@/components/home';
import { loginAdmin, loginUser } from '@/lib/actions';

export const metadata = {
  title: 'Project 007',
  description: 'created by Arsalan Ansari'
};

export default function HomePage() {
  return <Home loginAdmin={loginAdmin} />;
}
