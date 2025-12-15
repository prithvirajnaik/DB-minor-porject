const Donor = require('../models/Donor');
const DonorRequest = require('../models/DonorRequest');

exports.getStats = async (_req, res) => {
  try {
    const [totalDonors, availableDonors, totalRequests] = await Promise.all([
      Donor.countDocuments(),
      Donor.countDocuments({ availability_status: 'Available' }),
      DonorRequest.countDocuments(),
    ]);
    res.json({ totalDonors, availableDonors, totalRequests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




