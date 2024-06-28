const express = require('express');
const auth = require('../../config/auth');
const Viewing = require('../../models/viewing/viewing');
const Listing = require('../../models/listings/listing');
const User = require('../../models/user/user');
const logger = require('../../utils/logger')
const app = express();

// Schedule a viewing
app.post("/viewings/:listingId", auth, async (req, res) => {
    const { date, time } = req.body;
    const tenantId = req.user._id;
    const listingId = req.params.listingId;

    try {
        logger.info(`Scheduling viewing for listingId: ${listingId}`);
        
        const listing = await Listing.findById(listingId);
        if (!listing) {
            logger.error(`Listing not found: ${listingId}`);
            return res.status(404).json({ status: false, message: "Listing not found" });
        }
        const landlord = await User.findById(listing.userId);
        if (!landlord) {
            return res.status(404).json({ status: false, message: "Landlord not found" });
        }

        const viewing = new Viewing({
            listingId,
            tenantId,
            landlordId: landlord._id,
            date,
            time
        });

        await viewing.save();
        res.status(201).json({ status: true, data: viewing, message: "Viewing scheduled successfully!" });
    } catch (error) {
        logger.error("Error scheduling viewing:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while scheduling viewing. ${error.message}` });
    }
});

//get landlord bookings
app.get("/landlord/viewings", auth, async (req, res) => {
    const landlordId = req.user._id;

    try {
        // Find all listings created by the landlord
        const listings = await Listing.find({ userId: landlordId }).select('_id');

        // Extract listing IDs
        const listingIds = listings.map(listing => listing._id);

        // Find all viewings for these listings
        const viewings = await Viewing.find({ listingId: { $in: listingIds } })
            .populate('listingId')
            .populate('tenantId', 'firstName lastName email profileImageUrl')
            .populate('landlordId', 'firstName lastName email');

        res.status(200).json({
            status: true,
            data: viewings,
            message: "Viewings retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving viewings:", error.message);
        res.status(500).json({
            status: false,
            message: `Error occurred while retrieving viewings. ${error.message}`
        });
    }
});


// Update viewing status
app.patch("/viewings/:id", auth, async (req, res) => {
    const viewingId = req.params.id;
    const { action, rescheduledDate, rescheduledTime } = req.body;

    try {
        const viewing = await Viewing.findById(viewingId);
        if (!viewing) {
            return res.status(404).json({ status: false, message: "Viewing not found" });
        }

        if (action === 'Accepted') {
            viewing.status = 'Accepted';
        } else if (action === 'Rejected') {
            viewing.status = 'Rejected';
        } else if (action === 'Pending') {
            viewing.status = 'Pending';
        } else if (action === 'Rescheduled' && rescheduledDate && rescheduledTime) {
            viewing.status = 'Rescheduled';
            viewing.rescheduledDate = rescheduledDate;
            viewing.rescheduledTime = rescheduledTime;
            viewing.rescheduleRequest = false;
        } else {
            return res.status(400).json({ status: false, message: "Invalid action or missing reschedule details" });
        }

        await viewing.save();
        res.status(200).json({ status: true, data: viewing, message: "Viewing status updated successfully!" });
    } catch (error) {
        console.error("Error updating viewing status:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while updating viewing status. ${error.message}` });
    }
});

// Get all bookings for a tenant
app.get("/tenant/viewings", auth, async (req, res) => {
    const tenantId = req.user._id;

    try {
        const viewings = await Viewing.find({ tenantId })
            .populate('listingId', 'address photos')
            .populate('landlordId', 'firstName lastName email');

        res.status(200).json({
            status: true,
            data: viewings,
            message: "Viewings retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving viewings:", error.message);
        res.status(500).json({
            status: false,
            message: `Error occurred while retrieving viewings. ${error.message}`
        });
    }
});


// Reschedule a booking
app.patch("/tenant-reschedule/:id", auth, async (req, res) => {
    const viewingId = req.params.id;
    const { rescheduledDate, rescheduledTime } = req.body;

    try {
        const viewing = await Viewing.findOne({ _id: viewingId });
        if (!viewing) {
            return res.status(404).json({ status: false, message: "Viewing not found" });
        }

        viewing.status = 'Rescheduled';
        viewing.rescheduledDate = rescheduledDate;
        viewing.rescheduledTime = rescheduledTime;
        viewing.rescheduleRequest = true;

        await viewing.save();
        res.status(200).json({ status: true, data: viewing, message: "Viewing rescheduled successfully!" });
    } catch (error) {
        console.error("Error rescheduling viewing:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while rescheduling viewing. ${error.message}` });
    }
});

module.exports = app;