const PeopleService = require('../service/PeopleService')
const ReportService = require('../service/ReportService')

const ReportController = {
  create: async (request, response) => {
    try {
      const data = await ReportService.create({})
      response.send(data)
    } catch (error) {
      response.status(500).send({ error: 'Internal Server Error' })
    }
  },

  get: async (request, response) => {
    try {
      const peopleData = await PeopleService.getAll()

      const total = peopleData.length
      const totalSurvivors = peopleData.filter(e => !e.infected).length
      const totalInfected = peopleData.filter(e => e.infected).length
      const infectedPercentage = Math.floor((totalInfected / total) * 100) || 0
      const nonInfectedPercentage = 100 - infectedPercentage

      const {
        Water,
        Food,
        Medication,
        Ammunition
      } = ReportService.countEachItem(peopleData)

      const pointsLostByInfection = ReportService.getInfectedPoints(
        peopleData.filter(e => e.infected)
      )

      console.log(pointsLostByInfection)

      const send = {
        totalSurvivors,
        infectedPercentage,
        nonInfectedPercentage,
        pointsLostByInfection,
        averageWater: Water,
        averageFood: Food,
        averageMedication: Medication,
        averageAmmunition: Ammunition
      }
      response.send(send)
    } catch (error) {
      response.status(500).send({ error: 'Internal Server Error' })
    }
  }
}

module.exports = ReportController
