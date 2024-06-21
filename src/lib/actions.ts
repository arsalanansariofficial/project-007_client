'use server';
import axios from 'axios';
import { RESPONSE_STATUS } from './constants';
import { App_Authenticated_User, App_Exception, App_Request } from './types';

async function sendRequest(request: App_Request) {
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

export async function loginUser(options: App_Request) {
  return await sendRequest(options);
}
