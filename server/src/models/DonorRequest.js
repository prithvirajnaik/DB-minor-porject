const { Schema, model, Types } = require('mongoose');

const donorRequestSchema = new Schema(
  {
    hospital_id: { type: Types.ObjectId, ref: 'Hospital', required: true },
    donor_id: { type: Types.ObjectId, ref: 'Donor', required: true },
    request_date: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = model('DonorRequest', donorRequestSchema);


