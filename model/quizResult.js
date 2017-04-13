const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, ref: 'User'},
  quiz_id: {type: Schema.Types.ObjectId, ref: 'Quiz'},
  response: [{
    vocab_id: {type: Schema.Types.ObjectId, ref: 'Vocab'},
    answer: {type: String}
  }],
  timestamp: {type: Date}
});

const Model = {
  name: 'QuizResult',
  schema: QuizResultSchema
};

module.exports = mongoose.model(Model.name, Model.schema);
