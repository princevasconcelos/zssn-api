const mongoose = require('../database/mongo')

const ReportSchema = mongoose.Schema(
  {
    totalSurvivors: {
      type: Number,
      default: 0
    },
    infectedPercent: {
      type: Number,
      default: 0
    },
    nonInfectedPercent: {
      type: Number,
      default: 0
    },
    averageWaterPerSurvivor: {
      type: Number,
      default: 0
    },
    averageFoodPerSurvivor: {
      type: Number,
      default: 0
    },
    averageMedicationPerSurvivor: {
      type: Number,
      default: 0
    },
    averageAmmunitionPerSurvivor: {
      type: Number,
      default: 0
    },
    pointsLostByInfection: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
)

const Report = mongoose.model('Report', ReportSchema)

module.exports = Report
