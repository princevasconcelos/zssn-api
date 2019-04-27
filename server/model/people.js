const mongoose = require('../database/mongo')

const PeopleSchema = new mongoose.Schema(
  {
    location: {
      type: String
    },

    name: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

    lonlat: {
      type: String
    },

    items: {
      type: String,
      required: true
    },

    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People'
      }
    ],

    infectionCount: {
      type: Number,
      default: 0
    },

    infected: {
      type: Boolean,
      default: false
    },

    created_at: {
      type: Date,
      default: Date.now()
    },

    updated_at: {
      type: Date
    }
  },
  { versionKey: false }
)

const People = mongoose.model('People', PeopleSchema)

module.exports = People
