const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/zssn', { useNewUrlParser: true })
mongoose.Promise = global.Promise

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', function () {
  console.log('Mongoose connection successful')
})

module.exports = mongoose
