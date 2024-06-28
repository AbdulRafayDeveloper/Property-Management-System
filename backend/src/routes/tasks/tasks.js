const express = require('express');
const auth = require('../../config/auth');
const Task = require('../../models/tasks/tasks');

const app = express();

// Get tasks for the authenticated user
app.get("/tasks", auth, async (req, res) => {
    const userId = req.user._id;

    try {
        const tasks = await Task.find({ userId });

        res.status(200).json({
            status: true,
            data: tasks,
            message: "Tasks retrieved successfully!"
        });
    } catch (error) {
        console.error("Error retrieving tasks:", error.message);
        res.status(500).json({
            status: false,
            message: `Error occurred while retrieving tasks. ${error.message}`
        });
    }
});

module.exports = app;
