const VocabModel = require('../../../mongodb/model/vocab');
const UserModel = require('../../../mongodb/model/user');

const PromiseBoomReject = require('./helper').PromiseBoomReject;

module.exports = {
  add: (request, reply) => {
    const vocab = request.payload;
    const userid = request.auth.credentials._id;
    vocab._creator = userid;
    vocab._id = userid;
    return add(vocab).then(reply, reply);
  },
  import: (request, reply) => {
    const vocabs = request.payload;
    const creator = request.auth.credentials._id;

    vocabs.map(vocab => {
      vocab._creator = creator;
      return vocab;
    });
    return importVocabs(vocabs).then(reply, reply);
  },
  search: (request, reply) => {
    const query = request.query;
    const userid = request.auth.credentials._id;
    return search(userid, query).then(reply, reply);
  }
};

function importVocabs (vocabs) {
  return Promise.all(vocabs.map(vocab => {
    return add(vocab);
  }))
  .then(
        results => {
          return {
            message: `${results.length} records are imported`
          };
        },
        PromiseBoomReject('badRequest')
      );
}

function add (vocab) {
  const vocabModel = new VocabModel(vocab);
  return vocabModel.save()
  .then(
    result => UserModel.findOneAndUpdate({_id: vocab._creator}, {$push: {vocabularies: result._id}})
    .then(
      result => result,
      PromiseBoomReject('badRequest')
      ),
    PromiseBoomReject('badRequest')
  );
}

function search (userid, query) {
  const page = query.page;
  const limit = query.limit;
  const skip = limit * (page - 1);

  return UserModel.find({_id: userid}).populate({
    path: 'vocabularies',
    options: {
      limit,
      skip,
      select: '-__v'
    }
  }).select('vocabularies -_id');
}
