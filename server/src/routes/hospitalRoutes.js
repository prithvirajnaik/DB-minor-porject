const router = require('express').Router();
const { loginHospital } = require('../controllers/hospitalController');

router.post('/login', loginHospital);

module.exports = router;




