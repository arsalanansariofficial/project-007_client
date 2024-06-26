export const REQUEST_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
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

export const REQUEST_BODY = {
  USER_AUTHENTICATION: {
    identifier: 'identifier',
    password: 'password'
  }
};

export const IDENTIFIERS = {
  USER: 'USER',
  TOKEN: 'TOKEN'
};

export const ROUTES = {
  SALES: '/sales',
  ORDERS: '/orders',
  PRODUCTS: '/products',
  DASHBOARD: '/dashboard'
};
