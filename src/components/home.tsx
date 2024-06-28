'use client';
import Button from './button';
import { Show } from '@/lib/views';
import Exception from './exception';
import { useFormState } from 'react-dom';
import { storeObject } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { IDENTIFIERS, ROUTES } from '@/lib/constants';
import { App_Admin, App_Exception } from '@/lib/types';
import { loginAdmin as loginAdminAction } from '@/lib/actions';

export type App_Home = {
  loginAdmin: typeof loginAdminAction;
};

export default function Home({ loginAdmin }: App_Home) {
  const [state, formAction] = useFormState(loginAdmin, {});

  const router = useRouter();
  const user = state?.data as App_Admin;
  const exception = state as App_Exception;

  if (user && user.token) {
    storeObject(IDENTIFIERS.USER, user);
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <main>
      <h1>Home Page</h1>
      <form action={formAction}>
        <Show>
          <Show.When isTrue={!!exception.status}>
            <Exception exception={exception} />
          </Show.When>
        </Show>
        <input type="text" name="identifier" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <Button type="submit" fallback="Working..." text="Login" />
      </form>
    </main>
  );
}
