const jwt = require('jsonwebtoken');

module.exports = {
  test: (request, reply) => {
    const token = request.headers.authorization;
    console.log(token);
    const decoded = jwt.decode(token);
    return reply(decoded);
  }
};
