const router = require('express').Router();
const {
  createDonor,
  getDonors,
  updateDonor,
  searchDonors,
} = require('../controllers/donorController');

router.post('/', createDonor);
router.get('/', getDonors);
router.put('/:id', updateDonor);
router.get('/search', searchDonors);

module.exports = router;




