const People = require('../model/people')

const ItemService = require('../service/ItemService')

const PeopleController = {
  async get (request, response) {
    try {
      const data = await People.find()
      return response.status(200).send(data)
    } catch (error) {
      response.status(500).send({ error: 'Internval Server Error' })
    }
  },

  async getById (request, response) {
    try {
      const id = request.params.id
      const data = await People.findById(id)
      return response.status(200).send(data)
    } catch (error) {
      response.status(404).send('Id not found')
    }
  },

  async create (request, response) {
    try {
      const { body } = request

      const name = body.person['name']
      const age = body.person['age']
      const gender = body.person['gender']
      const lonlat = body.person['lonlat']
      const items = body.person['items']

      const itemsData = await ItemService.create(items)

      const data = await People.create({
        name,
        age,
        gender,
        lonlat,
        items: itemsData
      })

      return response.send(data)
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
      response.send(data)
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async report (request, response) {
    try {
      const reportedId = request.body.id
      const reportedData = await People.findById(reportedId)
      let { infectionCount, infected } = reportedData
      if (++infectionCount >= 3) infected = true
      const reportedUpdated = await People.findByIdAndUpdate(
        reportedId,
        {
          infectionCount,
          infected
        },
        { new: true }
      )

      const userId = request.params.id
      let { reports } = await People.findById(userId)
      if (!reports.includes(reportedId)) {
        reports.push(reportedId)
        await People.findByIdAndUpdate(userId, { reports }, { new: true })
      }

      return response.status(200).send(reportedUpdated)
    } catch (error) {
      response.status(400).send({ error: 'Bad request ' })
    }
  },

  async trade (request, response) {
    try {
      const sellerId = request.params.id

      const body = request.body
      const consumerId = body.consumer['id']
      const consumerPick = body.consumer['pick']
      const consumerPay = body.consumer['payment']

      const sellerData = await People.findById(sellerId)
      const consumerData = await People.findById(consumerId)

      const itemsData = await ItemService.trade(
        { consumerData, consumerPay },
        { sellerData, consumerPick }
      )

      const { sellerItems, consumerItems } = itemsData

      const seller = await People.findByIdAndUpdate(
        sellerId,
        {
          items: sellerItems
        },
        { new: true }
      )

      const consumer = await People.findByIdAndUpdate(
        consumerId,
        {
          items: consumerItems
        },
        { new: true }
      )

      response.send({ seller: seller.items, consumer: consumer.items })
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async getItems (request, response) {
    const id = request.params.id
    try {
      const data = await People.findById(id)
      return response.status(200).send(data.items)
    } catch (error) {
      response.status(404).send({ error: 'Id not found' })
    }
  }
}

module.exports = PeopleController
