const express = require("express");
const upload = require('../../utils/uploadConfig');
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../../config/auth");
const Application = require("../../models/application/application");
const Listing = require("../../models/listings/listing");
const { uploadToS3 } = require("../../utils/aws");
const logger = require('../../utils/logger');


const app = express();


app.post("/submit-application/:listingId", auth, upload.fields([
    { name: 'proofOfEarnings', maxCount: 10 },
    { name: 'workConfirmation', maxCount: 10 },
    { name: 'uniConfirmation', maxCount: 10 },
    { name: 'guarantorLetter', maxCount: 10 },
    { name: 'referenceLetter', maxCount: 10 },
    { name: 'idUpload', maxCount: 1 }
]), async (req, res) => {
    const { listingId } = req.params;
    const userId = req.user._id;

    let {
        moveInDate,
        moveOutDate,
        monthlyIncome,
        introduction,
        isStudent
    } = req.body;
    let currentLandlord = req.body.currentLandlord
    let coApplicant = req.body.coApplicant

    try {
        logger.info(`Application submission attempt by user: ${req.user.email} for listing ID: ${listingId}`);

        // Validate listing existence
        const listing = await Listing.findById(listingId);
        if (!listing) {
            logger.error(`Listing not found with ID: ${listingId}`);
            return res.status(404).json({ status: false, message: "Listing not found" });
        }

        // Check if the user has already submitted an application for this listing
        const existingApplication = await Application.findOne({ listing: listingId, user: userId });
        if (existingApplication) {
            logger.error(`User ${req.user.email} has already submitted an application for listing ID: ${listingId}`);
            return res.status(400).json({ status: false, message: "You have already submitted an application for this listing." });
        }

        // Parse currentLandlord JSON string
        try {
            currentLandlord = JSON.parse(currentLandlord);
            coApplicant = JSON.parse(coApplicant);
        } catch (e) {
            logger.error("Invalid JSON format for currentLandlord.");
            return res.status(400).json({ status: false, message: "Invalid JSON format for currentLandlord." });
        }

        // Array of required fields and their human-readable names
        const requiredFields = [
            { field: 'moveInDate', name: 'Move-in Date' },
            { field: 'moveOutDate', name: 'Move-out Date' },
            { field: 'monthlyIncome', name: 'Monthly Income' },
            { field: 'currentLandlord', name: 'Current Landlord' },
            { field: 'currentLandlord.name', name: 'Current Landlord Name' },
            { field: 'currentLandlord.phone', name: 'Current Landlord Phone' },
            { field: 'currentLandlord.email', name: 'Current Landlord Email' },
            { field: 'introduction', name: 'Introduction' }
        ];

        // Check for missing fields
        for (const { field, name } of requiredFields) {
            const value = field.startsWith('currentLandlord') ? field.split('.').reduce((o, i) => o[i], { currentLandlord }) : req.body[field];
            if (!value) {
                logger.error(`${name} is required.`);
                return res.status(400).json({ status: false, message: `${name} is required.` });
            }
        }

        // Array of required documents
        const requiredDocuments = [
            { doc: 'proofOfEarnings', name: 'Proof of Earnings' },
            { doc: 'workConfirmation', name: 'Work Confirmation' },
            { doc: 'referenceLetter', name: 'Reference Letter' },
        ];

        if (isStudent && (isStudent == 'true' || isStudent == true)) {
            requiredDocuments.push(
                { doc: 'uniConfirmation', name: 'University Confirmation' },
            );
            requiredDocuments.push(
                { doc: 'guarantorLetter', name: 'Guarantor Letter' },
            );
        }

        // Check for missing documents
        for (const { doc, name } of requiredDocuments) {
            if (!req.files[doc] || req.files[doc].length === 0) {
                logger.error(`${name} is required.`);
                return res.status(400).json({ status: false, message: `${name} is required.` });
            }
        }

        // Upload files to S3 and get their URLs
        const uploadFiles = async (files) => {
            let urls = [];
            for (let file of files) {
                const data = fs.readFileSync(file.path);
                const key = `applications/${userId}/${file.originalname}`;
                const s3Url = await uploadToS3(data, key);
                urls.push(s3Url);
                fs.unlinkSync(file.path);
                logger.info(`File :${file.fieldname} uploaded for user: ${req.user.email} - ${file.originalname}`);
            }
            return urls;
        };

        const proofOfEarnings = await uploadFiles(req.files.proofOfEarnings || []);
        const workConfirmation = await uploadFiles(req.files.workConfirmation || []);
        const uniConfirmation = await uploadFiles(req.files.uniConfirmation || []);
        const guarantorLetter = await uploadFiles(req.files.guarantorLetter || []);
        const referenceLetter = await uploadFiles(req.files.referenceLetter || []);
        const idUpload = req.user.photoId ? req.user.photoId : req.files.idUpload ? await uploadFiles(req.files.idUpload) : [];

        // Create a new application
        const newApplication = new Application({
            listing: listingId,
            user: userId,
            isStudent,
            moveInDate: new Date(moveInDate),
            moveOutDate: new Date(moveOutDate),
            monthlyIncome: parseFloat(monthlyIncome),
            currentLandlord,
            coApplicant: coApplicant ? coApplicant : undefined,
            introduction,
            documents: {
                proofOfEarnings,
                workConfirmation,
                studentDocuments: {
                    uniConfirmation,
                    guarantorLetter
                },
                referenceLetter,
                idUpload: idUpload[0]
            },
            status: "Sent"
        });

        await newApplication.save();
        logger.info(`Application submitted successfully by user: ${req.user.email} for listing ID: ${listingId}`);

        res.status(200).json({ status: true, data: newApplication, message: "Application submitted successfully!" });
    } catch (error) {
        console.error("Error submitting application:", error.message);
        logger.error(`Error submitting application for user ${req.user.email} and listing ID ${listingId}: ${error.message}`);
        res.status(500).json({ status: false, message: `Error occurred while submitting application. ${error.message}` });
    }
});


module.exports = app;
