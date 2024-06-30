import { useRef } from 'react';
import { App_Admin } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { IDENTIFIERS, ROUTES } from '@/lib/constants';
import { deleteObject, retrieveObject, storeObject } from '@/lib/utils';

export default function useAuth(sessionTime: number) {
  const router = useRouter();
  const timeout = useRef<null | NodeJS.Timeout>(null);

  function logout() {
    const user = retrieveObject<App_Admin>(IDENTIFIERS.USER);

    if (user && user.token) {
      clearTimeout(timeout.current as NodeJS.Timeout);

      timeout.current = null;
      deleteObject(IDENTIFIERS.USER);

      return router.push(ROUTES.LOGIN);
    }
  }

  function autoLogin() {
    const user = retrieveObject<App_Admin>(IDENTIFIERS.USER);

    if (user && user.token) {
      const date = new Date();

      const sessionTime = new Date(user.sessionTime).getTime();
      const difference = sessionTime - date.getTime();

      timeout.current = setTimeout(logout, difference);
    }
  }

  function login(user: App_Admin) {
    const date = new Date();
    const sessionTimeout = date.getTime() + sessionTime;

    console.log(sessionTimeout, sessionTime, new Date(sessionTimeout).toISOString())

    user.sessionTime = new Date(sessionTimeout).toISOString();
    timeout.current = setTimeout(logout, sessionTime);
    storeObject(IDENTIFIERS.USER, user);

    return router.push(ROUTES.DASHBOARD);
  }

  return { logout, login, autoLogin };
}
