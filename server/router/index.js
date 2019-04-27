const router = require('express').Router()
const PeopleController = require('../controllers/PeopleController')

router.get('/api/people.json', PeopleController.get)
router.get('/api/people/:id.json', PeopleController.getById)

router.post('/api/people.json', PeopleController.create)
router.post('/api/people/:id/report_infection.json', PeopleController.report)

router.patch('/api/people/:id.json', PeopleController.update)

module.exports = router
