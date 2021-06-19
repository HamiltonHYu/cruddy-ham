const mongoose = require('mongoose');
const { Schema } = mongoose;

// text, timestamp
const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
