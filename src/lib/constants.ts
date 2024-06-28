export const IDENTIFIERS = {
  USER: 'USER',
  TOKEN: 'TOKEN'
};

export const REQUEST_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const ROUTES = {
  SALES: '/sales',
  ORDERS: '/orders',
  PRODUCTS: '/products/',
  DASHBOARD: '/dashboard'
};

export const REQUEST_BODY = {
  USER_AUTHENTICATION: {
    password: 'password',
    identifier: 'identifier'
  }
};

export const RESPONSE_STATUS = {
  OK: {
    status: 200,
    text: 'Success'
  },
  BAD_REQUEST: {
    status: 400,
    text: 'Bad Request'
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    text: 'Internal Server Error'
  }
};
