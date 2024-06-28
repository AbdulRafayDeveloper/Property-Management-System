const express = require("express");
const auth = require("../../config/auth"); 
const Application = require("../../models/application/application");
const Listing = require('../../models/listings/listing')

const app = express();

// Route to get all applications for the landlord's listings
app.get("/landlord/applications", auth, async (req, res) => {
    const landlordId = req.user._id;

    try {
        // Find all listings by the landlord
        const listings = await Listing.find({ userId: landlordId });
        const listingIds = listings.map(listing => listing._id);

        // Find all applications for these listings
        const applications = await Application.find({ listing: { $in: listingIds } }).populate('listing').populate('user');

        res.status(200).json({ status: true, data: applications, message: "Applications retrieved successfully!" });
    } catch (error) {
        console.error("Error retrieving applications:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while retrieving applications. ${error.message}` });
    }
});

// Route to get applications for the landlord's listings
app.get("/landlord/application/:applicationId", auth, async (req, res) => {
    const { applicationId } = req.params;
    const landlordId = req.user._id;

    try {
        // Find the application by ID
        const application = await Application.findById(applicationId).populate('listing');

        if (!application) {
            return res.status(404).json({ status: false, message: "Application not found" });
        }

        // Ensure the listing belongs to the landlord
        const listing = await Listing.findOne({ _id: application.listing._id, userId: landlordId });

        if (!listing) {
            return res.status(403).json({ status: false, message: "You do not have permission to view this application" });
        }

        res.status(200).json({ status: true, data: application, message: "Application retrieved successfully!" });
    } catch (error) {
        console.error("Error retrieving application:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while retrieving application. ${error.message}` });
    }
});

// ROute to update status of application for landlord listing
app.put("/landlord/application/:applicationId", auth, async (req, res) => {
    const { applicationId } = req.params;
    const landlordId = req.user._id;
    const { status, requestDocuments } = req.body;

    try {
        // Find the application by ID
        const application = await Application.findById(applicationId).populate('listing');

        if (!application) {
            return res.status(404).json({ status: false, message: "Application not found" });
        }

        // Ensure the listing belongs to the landlord
        const listing = await Listing.findOne({ _id: application.listing._id, userId: landlordId });

        if (!listing) {
            return res.status(403).json({ status: false, message: "You do not have permission to update this application" });
        }

        // Update the application status if provided
        if (status) {
            if (!["Sent", "Unfinished", "Processing", "Rejected", "Accepted"].includes(status)) {
                return res.status(400).json({ status: false, message: "Invalid status value" });
            }
            application.status = status;
        }

        // Add requested documents to a specific field in the application if provided
        if (requestDocuments && Array.isArray(requestDocuments)) {
            application.requestDocuments = requestDocuments; 
        }

        // Save the updated application
        await application.save();

        res.status(200).json({ status: true, data: application, message: "Application updated successfully!" });
    } catch (error) {
        console.error("Error updating application:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while updating application. ${error.message}` });
    }
});


module.exports = app;
