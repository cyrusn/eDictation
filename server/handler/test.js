const jwt = require('jsonwebtoken');

module.exports = {
  test: (request, reply) => {
    const token = request.headers.authorization;
    const decoded = jwt.decode(token);
    return reply({
      message: 'This is message from test route'
    });
  }
};
