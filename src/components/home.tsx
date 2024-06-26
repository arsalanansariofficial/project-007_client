'use client';
import Button from './button';
import { useFormState } from 'react-dom';
import { storeObject } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { App_Admin, App_Exception } from '@/lib/types';
import { loginAdmin as loginAdminAction } from '@/lib/actions';
import { IDENTIFIERS, RESPONSE_STATUS, ROUTES } from '@/lib/constants';

export type App_Home = {
  loginAdmin: typeof loginAdminAction;
};

export default function Home({ loginAdmin }: App_Home) {
  const [state, formAction] = useFormState(loginAdmin, {});

  const router = useRouter();
  const user = state?.data as App_Admin;
  const exception = state as App_Exception;
  const hasError = !(exception.status === RESPONSE_STATUS.OK.status);

  if (user && user.token) {
    storeObject(IDENTIFIERS.USER, user);
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <main>
      <h1>Home Page</h1>
      <form action={formAction}>
        {hasError && exception.status}
        {exception?.message}
        {user?.token} {user?.user?.email}
        <input type="text" name="identifier" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <Button type="submit" fallback="Working..." text="Login" />
      </form>
    </main>
  );
}
