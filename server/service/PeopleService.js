const People = require('../model/people')

const PeopleService = {
  create: data => People.create(data),
  getAll: () => People.find(),
  getById: id => People.findById(id),
  update: (id, data) =>
    People.findByIdAndUpdate(id, data, {
      new: true
    })
}

module.exports = PeopleService
