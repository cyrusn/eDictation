const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, ref: 'User'},
  quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
  response: [{
    vocab_id: {type: Schema.Types.ObjectId, ref: 'Vocab'},
    answer: {type: String}
  }],
  timestamp: {type: Date}
});

const Model = {
  name: 'Result',
  schema: ResultSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
