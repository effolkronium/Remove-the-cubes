const router = require('express').Router();
const result_controller = require('../controllers/result_controller');

router.get('/', result_controller.sendTop10);

router.post('/', result_controller.saveNewResult);

module.exports = router;
