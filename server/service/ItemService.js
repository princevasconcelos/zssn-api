const Item = require('../model/item')

const getPoints = name =>
  ({
    Water: 4,
    Food: 3,
    Medication: 2,
    Ammunition: 1
  }[name])

const parseItems = items =>
  items
    .replace(/;$/gi, '')
    .split(';')
    .map(e => {
      const [name, quantity] = e.split(':')
      return { name, quantity: +quantity, points: getPoints(name) }
    })

const comparePoints = (pays, picks) => calcPoints(pays) === calcPoints(picks)

const calcPoints = arr =>
  arr.reduce((prev, curr) => {
    return prev + +curr.quantity * curr.points
  }, 0)

const checkItemsAmount = (currentItems, tradeItems) =>
  tradeItems.every(each => {
    const storedValue = currentItems.items.find(
      element => element.name === each.name
    )
    if (!storedValue) return false
    return storedValue.quantity >= each.quantity
  })

const calcNewItems = (currentItems, itemsToChange) =>
  currentItems.map(value => {
    const data = itemsToChange.find(item => item.name === value.name)
    if (!data) return value
    return {
      _id: value._id,
      name: value.name,
      points: value.points,
      quantity: value.quantity - data.quantity
    }
  })

const ItemService = {
  create: async items => Item.create(parseItems(items)),
  trade: async (
    { consumerData, consumerPay },
    { sellerData, consumerPick }
  ) => {
    const pays = parseItems(consumerPay)
    const picks = parseItems(consumerPick)

    const isEqualPoints = comparePoints(pays, picks)
    const consumerHasNecessaryItems = checkItemsAmount(consumerData, pays)
    const sellerHasNecessaryItems = checkItemsAmount(sellerData, picks)

    if (
      !isEqualPoints ||
      !consumerHasNecessaryItems ||
      !sellerHasNecessaryItems
    ) {
      return false
    }

    const consumerItems = calcNewItems(consumerData.items, pays)
    const sellerItems = calcNewItems(sellerData.items, picks)

    return {
      sellerItems,
      consumerItems
    }
  }
}

module.exports = ItemService
