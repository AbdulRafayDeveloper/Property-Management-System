const mongoose = require('mongoose');

const SavedListingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
    },
    isSaved:{type:Boolean,default:true}
}, { timestamps: true });


const SavedListings = mongoose.model('SavedListings', SavedListingSchema);

module.exports = SavedListings;