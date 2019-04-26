// const service = require('../service/people')
const People = require('../model/people')

const PeopleController = {
  async get (request, response) {
    try {
      const data = await People.find()
      return response.status(200).send({ user: data })
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async getById (request, response) {
    try {
      const id = request.params.id
      console.log(id)
      const data = await People.findById(id)
      return response.status(200).send(data)
    } catch (error) {
      response.status(404).send('Survivor not found')
    }
  },

  async create (request, response) {
    try {
      const body = request.body

      const name = body.person['name']
      const age = body.person['age']
      const gender = body.person['gender']
      const lonlat = body.person['lonlat']
      const items = body.items

      const people = await People.create({
        name,
        age,
        gender,
        lonlat,
        items
      })

      return response.send(people)
    } catch (errors) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async update (request, response) {
    try {
      const id = request.params.id
      const body = request.body

      const name = body.person['name']
      const age = body.person['age']
      const gender = body.person['gender']
      const lonlat = body.person['lonlat']
      const items = body.items
      console.log(name, age, gender, lonlat, items)
      const data = await People.findByIdAndUpdate(
        id,
        {
          name,
          age,
          gender,
          lonlat,
          items
        },
        {
          new: true
        }
      )
      console.log(id, data)
      response.send(data)
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  }
}

module.exports = PeopleController
