/* eslint-disable no-unused-vars */
const { MESSAGE, STATUS } = require('../utils/constants');

module.exports.handleErrors = ((err, req, res, next) => {
  const { statusCode = STATUS.ERROR.SERVER, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === STATUS.ERROR.SERVER ? MESSAGE.ERROR.SERVER : message });
});
