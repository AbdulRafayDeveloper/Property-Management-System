const express = require('express');
const app = express.Router();
const Listing = require('../../models/listings/listing');
const auth = require('../../config/auth')

//All Applied Listings
app.put('/impression/:listingId', auth, async (req, res) => {
    try {
        const listingId = req.params.listingId

        const listing = await Listing.findOne(listingId);

        if (listing && listing.userId == req.user._id) {
            logger.info('Cannot add impressions on the own listing')
        }else{
            listing.impressions = listing.impressions + 1
    
            await listing.save()
        }

        return res.status(200).json({ status: true, message: `Impressions Added Successfuly`, data: listing});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ status: false, message: `Internal Server Error ${error.message}` });
    }
});

//All Applied Listings
app.put('/click/:listingId', auth, async (req, res) => {
    try {
        const listingId = req.params.listingId

        const listing = await Listing.findOne(listingId);

        if (listing && listing.userId == req.user._id) {
            logger.info('Cannot add click on the own listing')
        }else{
            listing.clicks = listing.clicks + 1
    
            await listing.save()
        }

        return res.status(200).json({ status: true, message: `click Added Successfuly`, data: listing});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ status: false, message: `Internal Server Error ${error.message}` });
    }
});


module.exports = app