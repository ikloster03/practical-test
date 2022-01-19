const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    // match: [
    //   /^[1-9][0-9]{9}$/,
    //   'The value of path {PATH} ({VALUE}) is not a valid mobile number.',
    // ],
  },
  providers: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
