const sendError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

const sendSuccess = (res, status, data, message) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

module.exports = { sendError, sendSuccess };