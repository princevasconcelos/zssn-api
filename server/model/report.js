const mongoose = require('../database/mongo')

const ReportSchema = mongoose.Schema(
  {
    totalSurvivors: {
      type: Number,
      default: 0
    },
    infectedPercent: {
      type: String
    },
    nonInfectedPercent: {
      type: String
    },
    averageWaterPerSurvivor: {
      type: String
    },
    averageFoodPerSurvivor: {
      type: String
    },
    averageMedicationPerSurvivor: {
      type: String
    },
    averageAmmunitionPerSurvivor: {
      type: String
    },
    pointsLostByInfection: {
      type: String
    }
  },
  { versionKey: false }
)

const Report = mongoose.model('Report', ReportSchema)

module.exports = Report
