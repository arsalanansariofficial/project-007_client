import './main.css';
import { loginUser } from '@/lib/actions';

export const metadata = {
  title: 'Project 007',
  description: 'created by Arsalan Ansari'
};

export default function HomePage() {
  async function login(event: any) {}

  return (
    <main>
      <h1>Home Page</h1>
      <form action={loginUser}>
        <input type="email" name="identifier" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
