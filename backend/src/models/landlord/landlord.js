const mongoose = require("mongoose");
const validator = require("validator");
require('dotenv').config();

const schema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title:{
      type:String,
      enum:['Mr','Ms','Mrs']
    },
    phoneNumber:{
        type:String
    },
    company:{
        type:String
    },
    numberOfTenancies:{
        type:Number
    },
    role:{
        type:String,
        enum:['Director','Owner','Property Manager','Lettings Manager','Finance','Other']
    },
  },
  { timestamps: true });

const Landlord = mongoose.model("Landlord", schema);

module.exports = Landlord;
