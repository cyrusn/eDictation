// const logger = require('../../helper/logger');
const UserModel = require('../../model/user');

module.exports = {
  updatePassword: (request, reply) => {
    const payload = request.payload;

    const username = request.auth.credentials.username;
    const newPassword = payload.password;
    updatePassword(username, newPassword).then(reply).catch(reply);
  }
};

function updatePassword (username, password) {
  return UserModel.findOneAndUpdatePassword({username}, password);
}
