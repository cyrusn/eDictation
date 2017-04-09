// const logger = require('../../helper/logger');
const UserModel = require('../../../mongodb/model/user');

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
function importUsers (users) {
  return Promise.all(users.map(add));
}

function add (user) {
  const username = user.username;
  const cohort = user.cohort;

  return UserModel
    .findOne({username})
    .then(result => {
      let failMessage = `${username} existed`;

      if (result) {
        const isStudent = (result.role === 'student');
        if (!isStudent) {
          return Promise.reject(Boom.badRequest(failMessage));
        }

        const isCohortExist = _(result.cohorts)
                          .map('schoolYear')
                          .includes(cohort.schoolYear);

        if (isCohortExist) {
          let failMessage = `Cohort existed, update terminated.`;
          return Promise.reject(Boom.badRequest(failMessage));
        }

        return Promise.resolve(updateUserCohort(cohort)(result));
      }

      return saveNewUser(user);
    });
}

function saveNewUser (user) {
  const newUser = Object.assign({}, user);
  delete newUser.cohort;

  newUser.cohorts = [user.cohort];

  const userModel = new UserModel(newUser);
  return userModel.save();
}

function updateUserCohort (cohort) {
  return result => {
    return result.update({
      $push: {
        cohorts: cohort
      }
    });
  };
}
