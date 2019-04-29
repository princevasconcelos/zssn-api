const People = require('../model/people')

const removeUndefineds = myObj => JSON.parse(JSON.stringify(myObj))

const PeopleService = {
  create: data => People.create(data),
  getAll: () => People.find(),
  getById: id => People.findById(id),
  update: (id, data) =>
    People.findByIdAndUpdate(id, removeUndefineds(data), {
      new: true
    })
}

module.exports = PeopleService
