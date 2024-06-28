const express = require('express');
const app = express();
const auth = require('../../config/auth');
const MaintenanceRequest = require('../../models/maintenance/maintenance');
const Listing = require('../../models/listings/listing');
const upload = require('../../utils/uploadConfig');
const fs = require('fs');
const uploadsDir = 'uploads/';
const { uploadToS3 } = require('../../utils/aws');
const logger = require('../../utils/logger')
const Application = require('../../models/application/application')
//Create Maintaince Request
app.post("/maintenance-request/:listingId", auth, upload.array('photos', 10), async (req, res) => {
    const { name, location, description, priority, dueDate } = req.body;
    const userId = req.user._id;
 
    // Array of required fields
    const requiredFields = [
        { field: 'name', name: 'Name' },
        { field: 'location', name: 'Location' },
        { field: 'description', name: 'Description' },
        { field: 'priority', name: 'Priority' },
    ];

    // Check for missing fields
    for (const { field, name } of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ status: false, message: `${name} is required.` });
        }
    }

    try {
        // Find the accepted application of the renter
        const application = await Application.findOne({ user: userId, status: 'Accepted' });

        if (!application) {
            return res.status(404).json({ status: false, message: "Accepted application not found for the user." });
        }

        const listingId = application.listing;
        logger.info(`Creating maintenance request for listingId: ${listingId}`);

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ status: false, message: "Listing not found" });
        }

        // Upload files to S3 and get their URLs
        let photoUrls = [];
        for (let file of req.files) {
            const data = fs.readFileSync(file.path);
            const key = `maintenance/${userId}/${file.originalname}`;
            const s3Url = await uploadToS3(data, key);
            photoUrls.push(s3Url);
            fs.unlinkSync(file.path);
        }

        const maintenanceRequest = new MaintenanceRequest({
            userId,
            listingId,
            name,
            location,
            description,
            priority,
            dueDate,
            photos: photoUrls
        });

        await maintenanceRequest.save();
        res.status(201).json({ status: true, data: maintenanceRequest, message: "Maintenance request created successfully!" });
    } catch (error) {
        console.error("Error creating maintenance request:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while creating maintenance request. ${error.message}` });
    }
});

//get tenants maintaince requests
app.get("/maintenance-requests", auth, async (req, res) => {
    const userId = req.user._id;

    try {
        const maintenanceRequests = await MaintenanceRequest.find({ userId })
            .populate('listingId', 'address')
            .populate('notes.userId', 'firstName lastName email');

        res.status(200).json({
            status: true,
            data: maintenanceRequests,
            message: "Maintenance requests retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving maintenance requests:", error.message);
        res.status(500).json({
            status: false,
            message: `Error occurred while retrieving maintenance requests. ${error.message}`
        });
    }
});


//Tenant can add the notes in here
app.post("/maintenance-request/:id/notes", auth, async (req, res) => {
    const { note } = req.body;
    const userId = req.user._id;
    const requestId = req.params.id;

    if (!note) {
        return res.status(400).json({ status: false, message: "Note is required." });
    }

    try {
        const maintenanceRequest = await MaintenanceRequest.findById(requestId);
        if (!maintenanceRequest) {
            return res.status(404).json({ status: false, message: "Maintenance request not found" });
        }

        maintenanceRequest.notes.push({ userId, note });
        await maintenanceRequest.save();

        res.status(200).json({ status: true, data: maintenanceRequest, message: "Note added successfully!" });
    } catch (error) {
        console.error("Error adding note to maintenance request:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while adding note. ${error.message}` });
    }
});


//Lanlord-requests
app.get("/landlord/maintenance-requests", auth, async (req, res) => {
    const landlordId = req.user._id;

    try {
        // Find all listings created by the landlord
        const listings = await Listing.find({ userId: landlordId }).select('_id');

        // Extract listing IDs
        const listingIds = listings.map(listing => listing._id);

        // Find all maintenance requests for these listings
        const maintenanceRequests = await MaintenanceRequest.find({ listingId: { $in: listingIds } })
            .populate('listingId', 'address')
            .populate('userId', 'firstName lastName email')
            .populate('notes.userId', 'firstName lastName email');

        res.status(200).json({
            status: true,
            data: maintenanceRequests,
            message: "Maintenance requests retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving maintenance requests:", error.message);
        res.status(500).json({
            status: false,
            message: `Error occurred while retrieving maintenance requests. ${error.message}`
        });
    }
});

// Update maintenance request
app.patch("/maintenance-request/:id", auth, async (req, res) => {
    const requestId = req.params.id;
    const { action, note } = req.body;
    const userId = req.user._id;

    try {
        const maintenanceRequest = await MaintenanceRequest.findById(requestId);
        if (!maintenanceRequest) {
            return res.status(404).json({ status: false, message: "Maintenance request not found" });
        }

        if (action === 'Completed') {
            maintenanceRequest.status = 'Completed';
            maintenanceRequest.completedDate = new Date();
        } else if (action === 'In Progress') {
            maintenanceRequest.status = 'In Progress';
        }

        if (note) {
            maintenanceRequest.notes.push({ userId, note });
        }

        await maintenanceRequest.save();
        res.status(200).json({ status: true, data: maintenanceRequest, message: "Maintenance request updated successfully!" });
    } catch (error) {
        console.error("Error updating maintenance request:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while updating maintenance request. ${error.message}` });
    }
});



module.exports = app;
