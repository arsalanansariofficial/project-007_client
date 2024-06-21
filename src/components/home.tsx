'use client';
import { useFormState } from 'react-dom';
import { RESPONSE_STATUS } from '@/lib/constants';
import { state_authenticated_user } from '@/lib/state';
import { loginUser as loginAction } from '@/lib/actions';
import { App_Authenticated_User, App_Exception } from '@/lib/types';

export type App_Home = {
  loginUser: typeof loginAction;
};

export default function Home({ loginUser }: App_Home) {
  const [state, formAction] = useFormState(loginUser, state_authenticated_user);

  const exception = state as App_Exception;
  const user = state as App_Authenticated_User;
  const hasError = !(
    (state as App_Exception).status === RESPONSE_STATUS.OK.status
  );

  return (
    <main>
      <h1>Home Page</h1>
      <form action={formAction}>
        {hasError && exception.status}
        {exception && exception.message}
        {user && user.jwt} {user.user && user.user.username}
        <input type="email" name="identifier" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
