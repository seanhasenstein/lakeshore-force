const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoachSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

mongoose.model('coach', CoachSchema);
