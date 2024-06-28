const express = require("express");
const auth = require("../../config/auth"); 
const Application = require("../../models/application/application");

const app = express();
//Get all the submitted applications with their listings
app.get("/applications", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        const applications = await Application.find({ user: userId })
            .populate('listing')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalApplications = await Application.countDocuments({ user: userId });

        res.status(200).json({
            status: true,
            data: applications,
            page: parseInt(page),
            totalPages: Math.ceil(totalApplications / limit),
            totalApplications,
            message: "Applications retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving applications:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while retrieving applications. ${error.message}` });
    }
});


//Get single application
app.get("/my-application/:applicationId", auth, async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.user._id;

    try {
        const application = await Application.findOne({ _id: applicationId, user: userId }).populate('listing');

        if (!application) {
            return res.status(404).json({ status: false, message: "Application not found or you do not have permission to view this application" });
        }

        res.status(200).json({ status: true, data: application, message: "Application retrieved successfully!" });
    } catch (error) {
        console.error("Error retrieving application:", error.message);
        res.status(500).json({ status: false, message: `Error occurred while retrieving application. ${error.message}` });
    }
});


module.exports = app;
