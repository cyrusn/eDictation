const VocabModel = require('../../db/model/vocab');

module.exports = {
  add: (request, reply) => {
    const vocab = reply.payload;
    add(vocab).then(reply, reply);
  }
};

function add (vocab) {
  const vocabModel = new VocabModel(vocab);
  return vocabModel.save();
}
