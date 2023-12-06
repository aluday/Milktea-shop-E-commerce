// HTTP respose status: https://developers.rebrandly.com/docs/http-responses

const RESPONSE_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

/**
 * This function is used to only sent a successful message to client without data
 * @param {*} res: response object
 * @param {*} message: response message for the successful operation
 * @returns successful HTTP response
 */
const successResponse = (res, message) => {
  const responseObj = {
    status: true,
    message,
  };
  return res.status(RESPONSE_STATUS.OK).send(responseObj);
};

/**
 * This function is used to sent a successful message to client with the response data
 * @param {*} res: response object
 * @param {*} message: response message for the successful operation
 * @param {*} data: response data that sent to client
 * @returns successful HTTP response
 */
const successResponseWithData = (res, message, data) => {
  const responseObj = {
    status: true,
    message,
    data,
  };
  return res.status(RESPONSE_STATUS.OK).send(responseObj);
};

/**
 * This function is used to sent an error message to client when they sent an invalid JSON request
 * @param {*} res: response object
 * @param {*} message: response message for the invalid JSON request
 * @returns error HTTP response
 */
const invalidResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.BAD_REQUEST).send(responseObj);
};

/**
 * This function is used for user authorization and return an error message when user does not have permission.
 * Or the OAuth token is missing or invalid/expired.
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const unauthorizedResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.UNAUTHORIZED).send(responseObj);
};

/**
 * This function is used for Invalid input format/Resource already exists/Limit exceeded
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const forbiddenResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.FORBIDDEN).send(responseObj);
};

/**
 * This function is used when the resource or endpoint not found
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const notFoundResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.NOT_FOUND).send(responseObj);
};

/**
 * This function is used when there is no Content-Type specified or Content-Type is not accepted
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const notAcceptableResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.NOT_ACCEPTABLE).send(responseObj);
};

/**
 * This function is used for the Internal API error
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const errorResponse = (res, error) => {
  const responseObj = {
    status: false,
    message: "Rất tiếc đã có lỗi xảy ra :( Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.",
    error
  };
  return res.status(RESPONSE_STATUS.SERVER_ERROR).send(responseObj);
};

/**
 * This function is used when the API is under maintenance or is generally not available.
 * @param {*} res: response object
 * @param {*} message: response message
 * @returns error HTTP response
 */
const serviceUnavailableResponse = (res, message) => {
  const responseObj = {
    status: false,
    message,
  };
  return res.status(RESPONSE_STATUS.SERVICE_UNAVAILABLE).send(responseObj);
};

module.exports = {
  successResponse,
  successResponseWithData,
  invalidResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  notAcceptableResponse,
  errorResponse,
  serviceUnavailableResponse,
};
