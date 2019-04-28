const mongoose = require('../database/mongo')
const Schema = mongoose.Schema

const PeopleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      trim: true,
      required: true
    },

    lonlat: {
      type: String,
      trim: true
    },

    items: [
      {
        name: { type: String },
        quantity: { type: Number },
        points: { type: Number }
      }
    ],

    reports: [
      {
        type: Schema.Types.ObjectId,
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
