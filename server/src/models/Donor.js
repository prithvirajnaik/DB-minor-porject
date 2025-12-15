const { Schema, model } = require('mongoose');

const donorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    blood_group: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    availability_status: {
      type: String,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model('Donor', donorSchema);


