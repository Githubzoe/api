export const axiosErrorResponse400 = {
  response: {
    status: 400,
    statusText: "Bad Request",
    data: {
      errorCode: "api_validationerror",
      errorId: "error-19g6jl0g11sdz",
      httpStatusCode: 400,
      message: {
        status: 400,
        statusText: "Bad Request"
      }
    }
  }
}

export const axiosErrorResponse401 = {
  response: {
    status: 401,
    statusText: 'Unauthorized',
    data: 'Unauthorized',
    headers: {
      'content-length': '14',
      'content-type': 'application/json: charset=utf-8',
    }
  }
};