const router = require('express').Router()
const PeopleController = require('../controllers/PeopleController')
const ReportController = require('../controllers/ReportController')

router.get('/api/people.json', PeopleController.get)
router.get('/api/people/:id.json', PeopleController.getById)
router.get('/api/people/:id/properties.json', PeopleController.getItems)

router.post('/api/people.json', PeopleController.create)
router.post('/api/people/:id/report_infection.json', PeopleController.report)
router.post(
  '/api/people/:id/properties/trade_item.json',
  PeopleController.trade
)

router.patch('/api/people/:id.json', PeopleController.update)

router.get('/api/report.json', ReportController.get)
router.post('/api/report.json', ReportController.create)

module.exports = router
