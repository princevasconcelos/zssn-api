const PeopleService = require('../service/PeopleService')
const ItemService = require('../service/ItemService')

const PeopleController = {
  async get (request, response) {
    try {
      const data = await PeopleService.getAll()
      return response.status(200).send(data)
    } catch (error) {
      response.status(500).send({ error: 'Internal Server Error' })
    }
  },

  async getById (request, response) {
    try {
      const id = request.params.id
      const data = await PeopleService.getById(id)
      return response.status(200).send(data)
    } catch (error) {
      response.status(404).send('ID not found')
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

      const data = await PeopleService.create({
        name,
        age,
        gender,
        lonlat,
        items: itemsData
      })

      return response.status(201).send(data)
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
      const updatedAt = Date.now()

      const data = await PeopleService.update(id, {
        name,
        age,
        gender,
        lonlat,
        updatedAt
      })

      return response.status(200).send(data)
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async report (request, response) {
    try {
      const reportedId = request.body.id
      const reportedData = await PeopleService.getById(reportedId)
      let { infectionCount, infected } = reportedData
      if (++infectionCount >= 3) infected = true
      const reportedUpdated = await PeopleService.update(reportedId, {
        infectionCount,
        infected
      })

      const userId = request.params.id
      let { reports } = await PeopleService.getById(userId)

      if (!reports.includes(reportedId)) {
        reports.push(reportedId)
        await PeopleService.update(userId, { reports })
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

      const sellerData = await PeopleService.getById(sellerId)
      const consumerData = await PeopleService.getById(consumerId)

      const itemsData = await ItemService.trade(
        { consumerData, consumerPay },
        { sellerData, consumerPick }
      )

      const { sellerItems, consumerItems } = itemsData

      const seller = await PeopleService.update(sellerId, {
        items: sellerItems
      })

      const consumer = await PeopleService.update(consumerId, {
        items: consumerItems
      })

      return response
        .status(200)
        .send({ seller: seller.items, consumer: consumer.items })
    } catch (error) {
      response.status(400).send({ error: 'Bad request' })
    }
  },

  async getItems (request, response) {
    try {
      const id = request.params.id
      const data = await PeopleService.getById(id)
      return response.status(200).send(data.items)
    } catch (error) {
      response.status(404).send({ error: 'Id not found' })
    }
  }
}

module.exports = PeopleController
