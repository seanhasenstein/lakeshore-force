const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AthleteSchema = new Schema({
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
  jerseyNumber: {
    type: Number,
  },
  highSchool: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'team',
  },
});

mongoose.model('athlete', AthleteSchema);
