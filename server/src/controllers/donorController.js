const Donor = require('../models/Donor');

const buildSearchQuery = (query) => {
  const filters = {};
  if (query.blood_group) filters.blood_group = query.blood_group;
  if (query.city) filters.city = query.city;
  if (query.availability_status) {
    filters.availability_status = query.availability_status;
  }
  return filters;
};

exports.createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDonors = async (_req, res) => {
  try {
    const donors = await Donor.find().sort({ created_at: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchDonors = async (req, res) => {
  try {
    const donors = await Donor.find(buildSearchQuery(req.query)).sort({
      created_at: -1,
    });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




