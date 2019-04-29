const Report = require('../model/report')

const ReportService = {
  create: data => Report.create(data),
  getAll: () => Report.find(),
  countEachItem: data => {
    const itemsName = ['Water', 'Food', 'Medication', 'Ammunition']
    const initialValues = {
      Water: 0,
      Food: 0,
      Medication: 0,
      Ammunition: 0
    }

    return data
      .filter(survivor => !survivor.infected)
      .reduce((prev, curr) => {
        const [water, food, medication, ammunition] = itemsName.map(
          itemName => {
            const match = curr.items.find(t => t.name === itemName)
            if (!match) return { quantity: 0 }
            return match
          }
        )

        const currentItemsValue = {
          Water: water.quantity,
          Food: food.quantity,
          Medication: medication.quantity,
          Ammunition: ammunition.quantity
        }

        return {
          Water: prev.Water + currentItemsValue.Water,
          Food: prev.Food + currentItemsValue.Food,
          Medication: prev.Medication + currentItemsValue.Medication,
          Ammunition: prev.Ammunition + currentItemsValue.Ammunition
        }
      }, initialValues)
  },
  getInfectedPoints: survivorsInfected =>
    survivorsInfected.reduce((prev, curr) => {
      const sum = curr.items.reduce(
        (innerPrev, innerCurr) =>
          innerPrev + innerCurr.quantity * innerCurr.points,
        0
      )
      return prev + sum
    }, 0)
}

module.exports = ReportService
