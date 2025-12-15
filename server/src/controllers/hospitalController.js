const bcrypt = require('bcryptjs');
const Hospital = require('../models/Hospital');

exports.loginHospital = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }
  try {
    const hospital = await Hospital.findOne({ phone });
    if (!hospital) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = await bcrypt.compare(password, hospital.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: hospital._id,
      name: hospital.name,
      phone: hospital.phone,
      city: hospital.city,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




