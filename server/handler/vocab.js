const VocabModel = require('../../model/vocab');
// const UserModel = require('../../model/user');
const Boom = require('boom');

module.exports = {
  add: (request, reply) => {
    const vocab = request.payload;
    const username = request.auth.credentials.username;
    vocab.creator = username;
    return add(vocab).then(reply).catch(reply);
  },
  import: (request, reply) => {
    const vocabs = request.payload;
    const creator = request.auth.credentials.username;
    return importVocabs(vocabs.map(
      vocab => {
        vocab.creator = creator;
        return vocab;
      })
    ).then(reply).catch(reply);
  },
  search: (request, reply) => {
    const query = request.query;
    const username = request.auth.credentials.username;
    return search(username, query).then(reply, reply);
  },
  edit: (request, reply) => {
    const creator = request.auth.credentials.username;
    const vocabid = request.params.vocabid;
    const vocab = request.payload;

    return edit(creator, vocabid, vocab).then(reply, reply);
  },
  delete: (request, reply) => {
    const vocabids = request.payload;
    return removeVocabs(vocabids).then(reply, reply);
  }
};

function removeVocabs (vocabids) {
  const messages = [];
  return vocabids.reduce((next, vocabid) => {
    return next.then(() => {
      return remove(vocabid)
        .then(message => {
          messages.push(message);
          return messages;
        })
        .catch(err => {
          messages.push(err);
          return messages;
        });
    });
  }, Promise.resolve(messages));
}

function remove (vocabid) {
  return VocabModel.findOneAndRemove({
    _id: vocabid
  })
  .then(result => {
    if (result) {
      return {
        message: `${result.title} removed`
      };
    }

    return {
      message: `${vocabid} not found`
    };
  })
  .catch(err => {
    return {
      message: err.errmsg
    };
  });
}

function edit (creator, vocabid, vocab) {
  return VocabModel.findOneAndUpdate({creator, _id: vocabid}, vocab)
  .then(result => {
    return {
      message: `${result.title} updated`,
      update: result
    };
  })
  .catch(err => {
    throw Boom.badRequest(err);
  });
}

function importVocabs (vocabs) {
  // for Each return words if that already imported
  const messages = [];
  return vocabs.reduce((next, vocab) => {
    return next.then(() => {
      return add(vocab)
          .then(result => {
            messages.push({
              title: vocab.title,
              status: 'imported'
            });
            return Promise.resolve(messages);
          })
          .catch(err => {
            messages.push({
              title: vocab.title,
              status: 'rejected',
              error: err.errmsg
            });
            return Promise.resolve(messages);
          });
    });
  }, Promise.resolve(messages));
}

function add (vocab) {
  const payload = Object.assign({}, vocab);
  // console.log(payload);
  return new VocabModel(payload)
  .save()
  .then(result => {
    return {message: `${vocab.title} added to Database`};
  }).catch(err => {
    throw Boom.badRequest(err);
  });
}

function search (creator, query) {
  const page = query.page;
  const limit = query.limit;
  const skip = limit * (page - 1);
  const search = query.search;

  const options = {
    limit,
    skip,
    select: '-__v'
  };

  const mQuery = {
    creator
  };

  if (query.levels) {
    mQuery['$or'] = query.levels.map(level => ({level}));
  }

  if (search) {
    mQuery['title'] = new RegExp(search);
  }

  return VocabModel.find(mQuery, null, options)
  .lean()
  .exec()
  .catch(Boom.badRequest);
}
