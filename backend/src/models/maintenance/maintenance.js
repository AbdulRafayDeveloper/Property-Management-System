const mongoose = require("mongoose");

const MaintenanceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Listing'
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['Urgent', 'Medium', 'Low'],
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    notes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users',
          required: true
        },
        note: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    photos: {
      type: [String],
      default: []
    },
    dueDate: {
      type: Date,
      required: false
    },
    completedDate: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

const MaintenanceRequest = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);

module.exports = MaintenanceRequest;