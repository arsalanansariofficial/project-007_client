import { App_Request } from './types';
import { API_END_POINTS } from './enums';

export function getRequestConfig(identifier: number, request: App_Request) {
  let url;

  switch (identifier) {
    case API_END_POINTS.LOGIN:
      url = '/auth/local';
      break;
    case API_END_POINTS.REGISTER:
      url = '/auth/local/register';
      break;
    case API_END_POINTS.READ_USER:
      url = '/users/me?populate[orders][populate][products]=*';
      break;
    case API_END_POINTS.READ_PRODUCTS:
      url = '/products?populate=*';
      break;
    case API_END_POINTS.READ_PRODUCT:
      url = `/products/${request.params.id}?populate=*`;
      break;
    case API_END_POINTS.READ_ORDER:
      url = `/orders/${request.params.id}?populate=*`;
      break;
    case API_END_POINTS.READ_ORDERS:
      url = `/orders?populate=*`;
      break;
    case API_END_POINTS.CREATE_ORDER:
      url = '/orders';
      break;
    case API_END_POINTS.READ_DOWNLOAD:
      url = `/download-verifications/${request.params.id}`;
      break;
    default:
      url = '/products?populate=*';
  }

  request.url = url;
  return request;
}
