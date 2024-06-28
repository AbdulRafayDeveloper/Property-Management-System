const mongoose = require('mongoose');

const ViewingSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Listing'
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Declined', 'Rescheduled'],
      default: 'Pending'
    },
    rescheduleRequest: {
      type: Boolean,
      default: false
    },
    rescheduledDate: {
      type: Date
    },
    rescheduledTime: {
      type: String
    }
  },
  { timestamps: true }
);

const Viewing = mongoose.model('Viewing', ViewingSchema);

module.exports = Viewing;