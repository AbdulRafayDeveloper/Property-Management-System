// Import necessary dependencies
require("dotenv").config();
const express = require("express");
const auth = require("../../config/auth");
const upload = require('../../utils/uploadConfig');
const { uploadToS3 } = require('../../utils/aws');
const fs = require('fs');
const Listing = require('../../models/listings/listing');
const Application = require('../../models/application/application');
const Renter = require('../../models/renter/renter')
const logger = require('../../utils/logger');
const { listingFilter } = require("../../helpers/listingFilter");
const app = express();

// Create a new listing
app.post("/create-listing", auth, upload.array('photos', 10), async (req, res) => {
    const {
        address,
        monthlyRent,
        deposit,
        duration,
        availableDate,
        bedrooms,
        bathrooms,
        spaceType,
        propertyType,
        amenities,
        openListing,
        description
    } = req.body;

    try {

        if (req.user.isRenter) {
            const renter = await Listing.findOne({ userId: req.user._id })
            if (renter) {
                return res.status(400).json({ status: false, message: "You are not create more than one listings." });
            }

        }
        logger.info(`Create listing attempt by user: ${req.user.email}`);

        // Validate required fields
        if (!address || !monthlyRent || !duration || !availableDate || !bedrooms || !bathrooms || !spaceType || !propertyType || !description || !req.files || req.files.length < 3) {
            logger.error("All fields are required, and at least 3 photos must be provided.");
            return res.status(400).json({ status: false, message: "All fields are required, and at least 3 photos must be provided." });
        }

        // Upload files to S3 and get their URLs
        let photoUrls = [];
        for (let file of req.files) {
            const data = fs.readFileSync(file.path);
            const key = `listings/${req.user.id}/${file.originalname}`;
            const s3Url = await uploadToS3(data, key);
            photoUrls.push(s3Url);
            fs.unlinkSync(file.path);
            logger.info(`Photo uploaded for listing by user: ${req.user.email} - ${file.originalname}`);
        }

        // Create a new listing
        const newListing = new Listing({
            userId: req.user.id,
            address,
            monthlyRent: parseFloat(monthlyRent),
            deposit: deposit ? parseFloat(deposit) : null,
            duration,
            availableDate: new Date(availableDate),
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            spaceType,
            propertyType,
            amenities: JSON.parse(amenities),
            description,
            photos: photoUrls
        });

        await newListing.save();
        logger.info(`Listing created successfully by user: ${req.user.email}`);

        res.status(200).json({ status: true, data: newListing, message: "Listing created successfully!" });
    } catch (error) {
        console.error("Error creating listing:", error.message);
        logger.error(`Error creating listing for user ${req.user.email}: ${error.message}`);
        res.status(500).json({ status: false, message: `Error occurred during listing creation. ${error.message}` });
    }
});

// update exsisting listing
app.patch("/update-listing/:id", auth, upload.array('photos', 10), async (req, res) => {
    const { id } = req.params;

    const allowedFields = ['address', 'monthlyRent', 'deposit', 'duration', 'availableDate', 'bedrooms', 'bathrooms', 'spaceType', 'propertyType', 'amenities', 'description', 'photos','listingStatus'];

    const updates = Object.keys(req.body);
    const invalidFields = updates.filter(update => !allowedFields.includes(update));

    if (invalidFields.length > 0) {
        logger.error(`Invalid updates! The following fields are not allowed: ${invalidFields.join(', ')}`);
        return res.status(400).json({ status: false, message: `Invalid updates! The following fields are not allowed: ${invalidFields.join(', ')}` });
    }

    try {
        logger.info(`Update listing attempt by user: ${req.user.email} for listing ID: ${id}`);

        // Find the listing
        const listing = await Listing.findById(id);
        if (!listing) {
            logger.error(`Listing not found with ID: ${id}`);
            return res.status(404).json({ status: false, message: "Listing not found." });
        }

        if (listing.userId.toString() !== req.user._id.toString()) {
            logger.error(`User ${req.user.email} is not authorized to update this listing.`);
            return res.status(403).json({ status: false, message: "User not authorized to update this listing." });
        }

        // Upload files to S3 and get their URLs
        if (req.files && req.files.length > 0) {
            let photoUrls = [];
            for (let file of req.files) {
                const data = fs.readFileSync(file.path);
                const key = `listings/${req.user.id}/${file.originalname}`;
                const s3Url = await uploadToS3(data, key);
                photoUrls.push(s3Url);
                fs.unlinkSync(file.path);
                logger.info(`Photo uploaded for listing update by user: ${req.user.email} - ${file.originalname}`);
            }
            req.body.photos = photoUrls;
        }

         // Parse the amenities field if it is a string
         if (req.body.amenities && typeof req.body.amenities === 'string') {
            req.body.amenities = JSON.parse(req.body.amenities);
        }

        // Update the listing fields
        updates.forEach(update => listing[update] = req.body[update]);

        await listing.save();
        logger.info(`Listing updated successfully by user: ${req.user.email} for listing ID: ${id}`);

        res.status(200).json({ status: true, data: listing, message: "Listing updated successfully!" });
    } catch (error) {
        console.error("Error updating listing:", error.message);
        logger.error(`Error updating listing for user ${req.user.email} and listing ID ${id}: ${error.message}`);
        res.status(500).json({ status: false, message: `Error occurred during listing update. ${error.message}` });
    }
});

//delete the lisitng
app.delete("/delete-listing/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        logger.info(`Delete listing attempt by user: ${req.user.email} for listing ID: ${id}`);

        // Find the listing
        const listing = await Listing.findById(id);
        if (!listing) {
            logger.error(`Listing not found with ID: ${id}`);
            return res.status(404).json({ status: false, message: "Listing not found." });
        }

        // Check if the user is authorized to delete this listing
        if (listing.userId.toString() !== req.user._id.toString()) {
            logger.error(`User ${req.user.email} is not authorized to delete this listing.`);
            return res.status(403).json({ status: false, message: "User not authorized to delete this listing." });
        }

        // Delete all associated applications
        const deletedApplications = await Application.deleteMany({ listing: id });
        logger.info(`Deleted ${deletedApplications.deletedCount} applications for listing ID: ${id}`);

        // Delete the listing
        await Listing.deleteOne({ _id: id });
        logger.info(`Listing deleted successfully by user: ${req.user.email} for listing ID: ${id}`);

        res.status(200).json({ status: true, message: "Listing and associated applications deleted successfully!" });
    } catch (error) {
        logger.error(`Error deleting listing for user ${req.user.email} and listing ID ${id}: ${error.message}`);
        res.status(500).json({ status: false, message: `Error occurred during listing deletion. ${error.message}` });
    }
});

// Get a specific listing by ID
app.get("/listing/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findById(id).populate('userId');

        if (!listing) {
            return res.status(404).json({ status: false, message: "Listing not found." });
        }

        res.status(200).json({ status: true, data: listing });
    } catch (error) {
        console.error("Error fetching listing:", error.message);
        res.status(500).json({ status: false, message: "Internal server error while fetching listing." });
    }
});

// Get filtered and paginated listings
app.get("/listings", async (req, res) => {
    const { page = 1, limit = 8 } = req.query;
    const offset = (page - 1) * limit;

    try {
        logger.info(`Fetching listings - Page: ${page}, Limit: ${limit}`);

        // Build the filtering criteria
        let filterCriteria = {};

        const query = await listingFilter(req, filterCriteria)

        // Fetch filtered and paginated listings
        const listings = await Listing.find(query)
            .populate({
                path: 'userId',
            })
            .skip(offset)
            .limit(parseInt(limit));

        // Get the total count of listings for pagination
        const totalListings = await Listing.countDocuments(filterCriteria);

        // Calculate total pages
        const totalPages = Math.ceil(totalListings / limit);

        logger.info(`Listings fetched successfully - Total Items: ${totalListings}, Total Pages: ${totalPages}, Current Page: ${page}`);

        res.status(200).json({
            status: true,
            data: listings,
            totalItems: totalListings,
            totalPages,
            currentPage: parseInt(page),
            itemsPerPage: parseInt(limit)
        });
    } catch (error) {
        logger.error(`Error fetching listings: ${error.message}`);
        res.status(500).json({ status: false, message: "Internal server error while fetching listings." });
    }
});

// Get filtered and paginated listings of logged in landlord
app.get("/own-listings", auth, async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    try {
        logger.info(`Fetching own listings - Page: ${page}, Limit: ${limit}, User: ${req.user.email}`);

        let filterCriteria = {
            userId: req.user._id
        };

        const query = await listingFilter(req, filterCriteria)

        // Fetch filtered and paginated listings
        const listings = await Listing.find(query)
            .skip(offset)
            .limit(parseInt(limit));

        // Get the total count of listings for pagination
        const totalListings = await Listing.countDocuments(filterCriteria);

        // Calculate total pages
        const totalPages = Math.ceil(totalListings / limit);

        logger.info(`Own listings fetched successfully - Total Items: ${totalListings}, Total Pages: ${totalPages}, Current Page: ${page}`);

        res.status(200).json({
            status: true,
            data: listings,
            totalItems: totalListings,
            totalPages,
            currentPage: parseInt(page),
            itemsPerPage: parseInt(limit)
        });
    } catch (error) {
        console.error("Error fetching listings:", error.message);
        logger.error(`Error fetching own listings: ${error.message}`);
        res.status(500).json({ status: false, message: "Internal server error while fetching listings." });
    }
});

// Get a specific listing by ID
app.get("/own-listing/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        logger.info(`Fetching listing with ID: ${id} for user: ${req.user.email}`);

        const listing = await Listing.findById(id);

        if (!listing) {
            logger.error(`Listing not found with ID: ${id}`);
            return res.status(404).json({ status: false, message: "Listing not found." });
        }

        const applications = await Application.find({ listing: id }).populate('user');
        logger.info(`Found ${applications.length} applications for listing ID: ${id}`);

        const tenantDetails = await Promise.all(applications.map(async (app) => {
            const tenant = await Renter.findOne({ user: app.user._id });
            return {
                ...app.toObject(),
                tenant: tenant ? tenant.toObject() : null
            };
        }));

        logger.info(`Tenant details fetched for applications of listing ID: ${id}`);

        res.status(200).json({ status: true, data: { listing, applications: tenantDetails } });
    } catch (error) {
        console.error("Error fetching listing:", error.message);
        logger.error(`Error fetching listing with ID: ${id} - ${error.message}`);
        res.status(500).json({ status: false, message: "Internal server error while fetching listing." });
    }
});


module.exports = app;