const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('No token found!');
    }
    const decodedToken = jwt.verify(token, 'jwt_super_secret_key');
    req.userData = {
      // @ts-ignore
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    const err = new Error('Authorization failed!');
    return next(err);
  }
};
