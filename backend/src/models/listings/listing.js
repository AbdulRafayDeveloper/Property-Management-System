const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    monthlyRent: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Monthly rent must be a positive number");
        }
      }
    },
    deposit: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error("Deposit must be a positive number");
        }
      }
    },
    duration: {
      type: String,
      enum: ["Flexible", "Fixed", "Annual"],
      required: true
    },
    moveOutDate: {
      type: Date,
      required: false
    },
    startDate: {
      type: Date,
      required: false
    },
    endDate: {
      type: Date,
      required: false
    },
    commitmentDate: {
      type: Date,
      required: false
    },
    availableDate: {
      type: Date,
      required: true
    },
    openListingWithoutId: {
      type: Boolean,
			default: false
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0
    },
    spaceType: {
      type: String,
      enum: ["Entire Place", "Private Room", "Shared Room"],
      required: true
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Co-Living", "Guest House", "Condo", "Town House", "Basement"],
      required: true
    },
    amenities: {
      inTheHome:{
        type: [String],
        default: []
      },
      onTheProperty:{
        type: [String],
        default: []
      },
      safety:{
        type: [String],
        default: []
      }
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    photos: {
      type: [String],
      default: []
    },
    impressions:{
      type:Number,
      default:0
    },
    clicks:{
      type:Number,
      default:0
    },
    listingStatus:{
      type:String,
      default:'Active',
      enum:['Active', 'Listing', 'Rented', 'Renewal']
    }
  },
  {
    timestamps: true
  }
);


const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;