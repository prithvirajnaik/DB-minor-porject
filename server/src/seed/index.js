const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Donor = require('../models/Donor');
const Hospital = require('../models/Hospital');
const DonorRequest = require('../models/DonorRequest');

dotenv.config();

const donors = [
  { name: 'Ava Patel', blood_group: 'A+', phone: '555-0101', city: 'Mumbai' },
  { name: 'Liam Singh', blood_group: 'O+', phone: '555-0102', city: 'Delhi' },
  { name: 'Noah Khan', blood_group: 'B+', phone: '555-0103', city: 'Chennai' },
  { name: 'Emma Rao', blood_group: 'AB+', phone: '555-0104', city: 'Bengaluru' },
  { name: 'Olivia Jain', blood_group: 'A-', phone: '555-0105', city: 'Pune' },
  { name: 'Sophia Ali', blood_group: 'O-', phone: '555-0106', city: 'Hyderabad' },
  { name: 'Isabella Desai', blood_group: 'B-', phone: '555-0107', city: 'Ahmedabad' },
  { name: 'Mia Iyer', blood_group: 'AB-', phone: '555-0108', city: 'Kolkata' },
  { name: 'Ethan Mehta', blood_group: 'A+', phone: '555-0109', city: 'Jaipur' },
  { name: 'James Dsouza', blood_group: 'O+', phone: '555-0110', city: 'Chandigarh' },
].map((donor, index) => ({
  ...donor,
  availability_status: index % 3 === 0 ? 'Unavailable' : 'Available',
}));

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Donor.deleteMany({}),
      Hospital.deleteMany({}),
      DonorRequest.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    const createdDonors = await Donor.insertMany(donors);
    console.log(`Inserted ${createdDonors.length} donors`);

    const passwordHash = await bcrypt.hash(
      process.env.DEFAULT_HOSPITAL_PASSWORD || 'password123',
      10
    );

    const hospital = await Hospital.create({
      name: 'City Hospital',
      phone: process.env.DEFAULT_HOSPITAL_PHONE || '999-000-0000',
      city: 'Mumbai',
      password: passwordHash,
    });

    console.log(`Created hospital login for phone ${hospital.phone}`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();




