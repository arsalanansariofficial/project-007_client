'use server';
import axios from 'axios';
import processEnv from '../../next-env';
import { API_END_POINTS } from './enums';
import { getRequestConfig } from './utils';
import { REQUEST_BODY, REQUEST_METHODS, RESPONSE_STATUS } from './constants';
import { App_Authenticated_User, App_Exception, App_Request } from './types';

export async function sendRequest(request: App_Request) {
  try {
    return (await axios.request(request as any)).data as App_Authenticated_User;
  } catch (error: any) {
    const exception = error?.response?.data?.error as App_Exception;
    return {
      details: exception?.details || {},
      name: exception?.name || RESPONSE_STATUS.INTERNAL_SERVER_ERROR.text,
      message: exception?.message || RESPONSE_STATUS.INTERNAL_SERVER_ERROR.text,
      status: exception?.status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR.status
    } as App_Exception;
  }
}

export async function loginUser(
  _state: App_Authenticated_User | App_Exception,
  formdata: FormData
) {
  const identifier = formdata.get(REQUEST_BODY.USER_AUTHENTICATION.identifier);
  const password = formdata.get(REQUEST_BODY.USER_AUTHENTICATION.password);

  if (!identifier || !password)
    return {
      details: {},
      name: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.text,
      message: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.text,
      status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.status
    } as App_Exception;

  return await sendRequest(
    getRequestConfig(API_END_POINTS.LOGIN, {
      url: String(),
      method: REQUEST_METHODS.POST,
      baseURL: processEnv.BASE_URL,
      headers: { 'content-type': 'application/json' },
      params: {},
      data: {
        identifier,
        password
      }
    })
  );
}
