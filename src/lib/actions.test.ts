import { loginUser } from './actions';
import { API_END_POINTS } from './enums';
import { getRequestConfig } from './utils';
import { describe, expect, test } from '@jest/globals';
import { REQUEST_METHODS, RESPONSE_STATUS } from './constants';
import { App_Authenticated_User, App_Exception } from './types';

describe('API Module', function () {
  test.skip('Should not login user with invalid credentials', async function () {
    const exception = (await loginUser(
      getRequestConfig(API_END_POINTS.LOGIN, {
        url: String(),
        method: REQUEST_METHODS.POST,
        baseURL: process.env.BASE_URL!,
        headers: { 'content-type': 'application/json' },
        params: {},
        data: {
          identifier: String(),
          password: String()
        }
      })
    )) as App_Exception;
    expect(exception.status).toBe(RESPONSE_STATUS.BAD_REQUEST.status);
  });

  test.skip('Should login user with valid credentials', async function () {
    const user = (await loginUser(
      getRequestConfig(API_END_POINTS.LOGIN, {
        url: String(),
        method: REQUEST_METHODS.POST,
        baseURL: process.env.BASE_URL!,
        headers: { 'content-type': 'application/json' },
        params: {},
        data: {
          identifier: 'first.user@example.com',
          password: 'first.user'
        }
      })
    )) as App_Authenticated_User;
    expect(user.jwt).toBeDefined();
  });

  test.skip('Should return an exception response if there is no network connection', async function () {
    const exception = (await loginUser(
      getRequestConfig(API_END_POINTS.LOGIN, {
        url: String(),
        method: REQUEST_METHODS.POST,
        baseURL: String('http://some-invalid-url'),
        headers: { 'content-type': 'application/json' },
        params: {},
        data: {
          identifier: 'first.user@example.com',
          password: 'first.user'
        }
      })
    )) as App_Exception;
    expect(exception.status).toBe(RESPONSE_STATUS.INTERNAL_SERVER_ERROR.status);
  });
});
