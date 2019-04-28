const mongoose = require('../database/mongo')
const Schema = mongoose.Schema

const ItemSchema = Schema(
  [
    {
      name: {
        type: String,
        require: true
      },
      quantity: {
        type: Number,
        default: 0
      },
      points: {
        type: Number,
        required: true
      }
    }
  ],
  { versionKey: false }
)

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
