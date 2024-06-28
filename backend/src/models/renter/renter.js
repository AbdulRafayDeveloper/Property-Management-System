const mongoose = require("mongoose");
const validator = require("validator");
require('dotenv').config();

const schema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    currentAddress:{
      type:String
    },
    schoolName:{
      type:String
    },
    schoolYear:{
      type:String
    },
    employmentStatus:{
        type:String,
        enum:['Employed','Unemployed','Self Employed','Student']
    },
  },
  { timestamps: true });

const Renter = mongoose.model("Renter", schema);

module.exports = Renter;
