const express = require('express');
const auth = require('../../config/auth');
const SavedListing = require('../../models/listings/savedListings');
const app = express();

//SaveListing
app.post('/saveListing/:listingId', auth, async (req, res) => {
    try {
        const listingId = req.params.listingId;
        const userId = req.user?._id

        if (!listingId) {
            return res.status(404).json({ status: false, error: "Please Provide Listing id" });
        }

        const previousListing = await SavedListing.find({ user:userId,listing:listingId })

        if (previousListing.length > 0) {
            await SavedListing.findByIdAndDelete(previousListing[0]._id);

        } else {
            const saveListing = new SavedListing({ user:userId,listing:listingId });
            await saveListing.save();
        }

        return res.status(200).json({ status: true, success: "Successfully Saved the Listings" });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
});
//GetAllSavedListings
app.get('/saveListing', auth, async (req, res) => {
    try {

        const userId = req.user._id;

        // Find saved Listings for the candidate
        const savedListings = await SavedListing.find({ user: userId })
        .populate('listing')
        .exec();

        return res.status(200).json({ status: true, success: "Successfully fetched the Listings", total: savedListings.length, data: savedListings });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

module.exports = app