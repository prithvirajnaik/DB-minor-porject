const DonorRequest = require('../models/DonorRequest');

exports.createRequest = async (req, res) => {
  try {
    const request = await DonorRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRequests = async (_req, res) => {
  try {
    const requests = await DonorRequest.find()
      .populate('hospital_id', 'name city phone')
      .populate('donor_id', 'name blood_group city phone')
      .sort({ request_date: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




