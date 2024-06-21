export const REQUEST_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const RESPONSE_STATUS = {
  BAD_REQUEST: {
    status: 400,
    text: 'Bad Request'
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    text: 'Internal Server Error'
  }
};
