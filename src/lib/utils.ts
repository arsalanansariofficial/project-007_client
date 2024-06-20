import { T_Request } from './types';
import { API_END_POINTS } from './enums';
import { REQUEST_METHODS } from './constants';

export function getRequestObject(request: T_Request) {
  return {
    method: request.method ? request.method : REQUEST_METHODS.GET,
    headers: request.header ? request.header : {},
    body: request.body ? request.body : null
  };
}

export function getRequestPath(identifier: any, request?: any) {
  switch (identifier) {
    case API_END_POINTS.LOGIN:
      return '/auth/local';

    case API_END_POINTS.REGISTER:
      return '/auth/local/register';

    case API_END_POINTS.READ_USER:
      return '/users/me?populate[orders][populate][products]=*';

    case API_END_POINTS.READ_PRODUCTS:
      return '/products?populate=*';

    case API_END_POINTS.READ_PRODUCT:
      return `/products/${request.id}?populate=*`;

    case API_END_POINTS.READ_ORDER:
      return `/orders/${request.id}?populate=*`;

    case API_END_POINTS.CREATE_ORDER:
      return '/orders';

    case API_END_POINTS.READ_DOWNLOAD:
      return `/download-verifications/${request.id}`;

    default:
      return '/products?populate=*';
  }
}
