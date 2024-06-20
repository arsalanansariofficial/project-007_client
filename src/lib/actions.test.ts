import axios from 'axios';
import { T_Exception } from './types';
import { getRequestPath } from './utils';
import { API_END_POINTS } from './enums';
import { RESPONSE_STATUS } from './constants';
import { describe, expect, test } from '@jest/globals';

describe('API Module', function () {
  test.skip('Should login user with valid credentials', async function () {
    let url, body, options, data;
    try {
      url = process.env.BASE_URL + getRequestPath(API_END_POINTS.LOGIN);
      body = {
        identifier: 'first.user@example.com',
        password: 'first.user'
      };
      options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      data = (await axios.post(url, body, options)).data;
    } catch (error: any) {
    } finally {
      expect(data).toBeTruthy();
      expect(data.jwt).toBeTruthy();
      expect(data.user.email).toBe(body!.identifier);
    }
  });

  test.skip('Should not login user with invalid credentials', async function () {
    try {
      const url = process.env.BASE_URL + getRequestPath(API_END_POINTS.LOGIN);
      const body = {
        identifier: String(),
        password: String()
      };
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const data = (await axios.post(url, body, options)).data;
    } catch ({ response: error }: any) {
      const exception = error.data.error as T_Exception;
      expect(exception.status).toBe(RESPONSE_STATUS.BAD_REQUEST.status);
    }
  });
});
