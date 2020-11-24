// @ts-ignore
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Person = mongoose.model('person', PersonSchema);

module.exports = Person;
