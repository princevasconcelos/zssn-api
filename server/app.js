const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('./router'))

app.listen(3000, () => console.log('Node running on port 3000'))
