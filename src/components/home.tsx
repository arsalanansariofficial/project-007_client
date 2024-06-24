'use client';
import { useFormState } from 'react-dom';
import { RESPONSE_STATUS } from '@/lib/constants';
import { App_Admin, App_Exception } from '@/lib/types';
import { loginAdmin as loginAdminAction } from '@/lib/actions';

export type App_Home = {
  loginAdmin: typeof loginAdminAction;
};

export default function Home({ loginAdmin }: App_Home) {
  const [state, formAction] = useFormState(loginAdmin, {});

  const exception = state as App_Exception;
  const user = state?.data as App_Admin;
  const hasError = !(exception.status === RESPONSE_STATUS.OK.status);

  if (user && user.token) sessionStorage.setItem('user', JSON.stringify(user));

  return (
    <main>
      <h1>Home Page</h1>
      <form action={formAction}>
        {hasError && exception.status}
        {exception && exception.message}
        {user && user.token} {user && user.user && user.user.email}
        <input type="text" name="identifier" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
