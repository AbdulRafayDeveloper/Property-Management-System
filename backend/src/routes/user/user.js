require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../../config/auth");
const logger = require('../../utils/logger')
const { sendEmail } = require("../../utils/sendEmail");
const {uploadToS3} = require('../../utils/aws')
const User = require('../../models/user/user')
const Landlord = require('../../models/landlord/landlord')
const Renter = require('../../models/renter/renter')
const upload = require('../../utils/uploadConfig');
const mongoose = require('mongoose')
const fs = require('fs');
const Listing = require("../../models/listings/listing");
const app = express();

//Signup User
app.post("/user/signup", async (req, res) => {
    const { type, userDetails, details } = req.body;
    const session = await mongoose.startSession();
    try {
        if (!userDetails.email || !userDetails.firstName || !userDetails.lastName || !userDetails.password || !userDetails.confirmPassword) {
            logger.error("Signup error: All fields are required.");
            return res.status(400).json({ status: false, message: "All fields are required." });
        }

        if (userDetails.password !== userDetails.confirmPassword) {
            logger.error("Signup error: Passwords do not match.");
            return res.status(400).json({ status: false, message: "Passwords do not match." });
        }

        let email = userDetails.email.toLowerCase();

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            logger.error("Signup error: Email already signed-up");
            return res.status(400).json({ status: false, message: "Email already signed-up" });
        }

        session.startTransaction();
        logger.info("Transaction started for signup.");

        // Create new user
        const user = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: email,
            password: userDetails.password,
            lastLogin: new Date(),
            birthdate: new Date(userDetails.birthdate),
            gender: userDetails.gender,
            isLandlord: type === 'landlord',
            isRenter: type === 'renter'
        });

        await user.save({ session });
        logger.info(`User ${user.email} created.`);

        let additionalDetails;
        if (type === 'landlord') {
            additionalDetails = new Landlord({
                user: user._id,
                ...details
            });
            await additionalDetails.save({ session });
            logger.info(`Landlord details for user ${user.email} saved.`);
        } else if (type === 'renter') {
            additionalDetails = new Renter({
                user: user._id,
                ...details
            });
            await additionalDetails.save({ session });
            logger.info(`Renter details for user ${user.email} saved.`);
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.token_key);
        user.tokens = user.tokens.concat({ token });
        await user.save({ session });
        logger.info(`Token for user ${user.email} generated and saved.`);

        // Generate a verification token
        const verificationToken = generateSixDigitCode().toString();
        logger.info(`Verification token for user ${user.email} generated: ${verificationToken}`);
        user.verificationToken = verificationToken;
        user.expires = Date.now() + 24 * 60 * 60 * 1000;
        await user.save({ session });

        // Prepare and send the verification email
        let body = `<p>Welcome to the platform, ${user.firstName}!</p>
                    <p>Please verify your email by using this code: <strong>${verificationToken}</strong></p>
                    <p>This code will expire in 24 hours.</p>`;

        await sendEmail('Verify', email, body);
        logger.info(`Verification email sent to ${user.email}.`);

        await session.commitTransaction();
        session.endSession();
        logger.info(`Transaction committed for user ${user.email}.`);

        res.status(200).json({ status: true, data: { user, access: token }, message: "User registered! Please check your email to verify your account." });
    } catch (error) {
        logger.error(`Signup error: ${error.message}`);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ status: false, message: "Internal server error during signup." });
    }
});
// Verify User
app.get('/user/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;

        logger.info(`Verification attempt with token: ${token}`);

        // Find the user by the verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            logger.error("Verification error: Invalid or expired token.");
            return res.status(400).json({ status: false, message: "Invalid or expired token." });
        }

        // Check if the token has expired
        if (new Date() > user.expires) {
            logger.error("Verification error: Token has expired.");
            return res.status(400).json({ status: false, message: "Invalid or expired token." });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            logger.info(`User ${user.email} is already verified.`);
            return res.status(400).json({ status: false, message: "User is already verified. Login again to continue." });
        }

        // Update the user to set isVerified to true and clear the verificationToken and expires fields
        user.isVerified = true;
        user.verificationToken = undefined;
        user.expires = undefined;
        await user.save();

        logger.info(`User ${user.email} verified successfully.`);

        // Return the updated user details
        const updatedUser = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified,
        };

        res.status(200).json({ status: true, data: updatedUser, message: "Email verified successfully!" });
    } catch (error) {
        console.error("Verification error:", error);
        logger.error(`Verification error: ${error.message}`);
        res.status(500).json({ status: false, message: "Internal server error during verification." });
    }
});

// Resend Verification Email
app.post('/user/resend-verification', auth, async (req, res) => {
    try {
        const user = req.user;

        logger.info(`Resend verification email attempt for user: ${user.email}`);

        if (user.isVerified) {
            logger.info(`User ${user.email} is already verified.`);
            return res.status(400).json({ status: false, message: "User is already verified." });
        }

        // Generate a new verification token
        const verificationToken = generateSixDigitCode().toString();
        user.verificationToken = verificationToken;
        user.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        logger.info(`New verification token generated for user ${user.email}: ${verificationToken}`);

        // Prepare and send the verification email
        let body = `<p>Welcome to the platform, ${user.firstName}!</p>
                    <p>Please verify your email by using this code: <strong>${verificationToken}</strong></p>
                    <p>This code will expire in 24 hours.</p>`;

        await sendEmail('Verify', user.email, body);
        logger.info(`Verification email sent to ${user.email}`);

        res.status(200).json({ status: true, message: "Verification email resent successfully." });
    } catch (error) {
        console.error("Error resending verification email:", error);
        logger.error(`Error resending verification email: ${error.message}`);
        res.status(500).json({ status: false, message: "Internal server error while resending verification email." });
    }
});


// Login User
app.post("/user/login", async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            logger.error('Please Provide email and password ')
            return res.json({
                status: false,
                error: "Please Provide Correct email and password ",
            });
        }

        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        if (!user) {
            logger.error(new Date().toLocaleString() + 'Incorrect Email or Password');
            return res.json({ status: false, error: "Email or Password is incorrect " });
        }
        let access = await user.generateAuthToken();

        user.lastLogin = new Date();
        logger.info(`Login Successful for user: ${req.body.email}`);
        await user.save();
        return res.json({
            status: true,
            success: "Successfully Login",
            data: { data: user, access, success: "success" },
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(400).json({
            status: false,
            message: `Login Failed ${error.message}`,
            error: error.message,
        });
    }
});

//update user
app.patch("/update-user", auth, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'photoId', maxCount: 1 }]), async (req, res) => {

    // Allowed fields for update
    const allowedFields = ['firstName', 'lastName', 'birthdate', 'profileImageUrl', 'photoId', 'description'];
    if (req.body.birthdate) {
        req.body.birthdate = new Date(req.body.birthdate);
    }
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedFields.includes(update));

    if (!isValidOperation) {
        logger.error(`Invalid updates! Allowed fields are: ${allowedFields.join(', ')}`);
        return res.status(400).json({ status: false, message: `Invalid updates! Allowed fields are: ${allowedFields.join(', ')}` });
    }

    // Find the user and update their information
    const user = await User.findById(req.user.id);

    try {
        logger.info(`Update attempt for user: ${req.user.email}`);

        // Upload files to S3 and get their URLs
        if (req.files) {
            if (req.files.profileImage) {
                const profileImage = req.files.profileImage[0];
                const data = fs.readFileSync(profileImage.path);
                const key = `users/${req.user.id}/profileImage-${profileImage.originalname}`;
                const s3Url = await uploadToS3(data, key);
                req.body.profileImageUrl = s3Url;
                user.profileImageUrl = s3Url
                fs.unlinkSync(profileImage.path);
                logger.info(`Profile image uploaded for user: ${req.user.email}`);
            }
            if (req.files.photoId) {
                const photoId = req.files.photoId[0];
                const data = fs.readFileSync(photoId.path);
                const key = `users/${req.user.id}/photoId-${photoId.originalname}`;
                const s3Url = await uploadToS3(data, key);
                req.body.photoId = s3Url;
                user.photoId = s3Url
                user.isIdUploaded = true
                fs.unlinkSync(photoId.path);
                logger.info(`Photo ID uploaded for user: ${req.user.email}`);
            }
        }

        if (!user) {
            logger.error(`User not found: ${req.user.email}`);
            return res.status(404).json({ status: false, message: "User not found." });
        }

        updates.forEach(update => user[update] = req.body[update]);
        user.isDocumentUploaded = true
        await user.save();
        logger.info(`User ${user.email} updated successfully`);


        res.status(200).json({ status: true, data: user, message: "User updated successfully!" });
    } catch (error) {
        console.error("Error updating user:", error.message);
        logger.error(`Error updating user ${req.user.email}: ${error.message}`);
        res.status(500).json({ status: false, message: `Error occurred while updating user. ${error.message}` });
    }
});

// Get the User
app.get('/user', auth, async (req, res) => {
    try {
        logger.info(`Fetching user with ID: ${req.user._id}`);

        const user = await User.findById(req.user._id);

        if (!user) {
            logger.error(`User not found with ID: ${req.user._id}`);
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        const response = { status: true, message: 'User retrieved successfully', data: { user } };

        if (user.isLandlord) {
            const landlord = await Landlord.findOne({ user: user._id });
            response.data.details = landlord;
            logger.info(`Landlord details fetched for user: ${user.email}`);
        }

        if (user.isRenter) {
            const renter = await Renter.findOne({ user: user._id });
            response.data.details = renter;
            logger.info(`Renter details fetched for user: ${user.email}`);
        }

        logger.info(`User ${user.email} fetched successfully`);
        return res.status(200).json(response);
    } catch (error) {
        logger.error(`Error fetching user: ${error.message}`);
        return res.status(500).json({
            status: false,
            message: 'Error fetching User',
            error: error.message
        });
    }
});


app.post("/user/changepassword", auth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            logger.error("Please Enter Correct password");
            return res.json({
                status: false,
                error: "Please Enter Correct password",
            });
        }

        if (oldPassword === newPassword) {
            logger.error("New Password Must be different from Old One");
            return res.json({
                status: false,
                error: "New Password Must be different from Old One",
            });
        }
        
        const user = await User.findById(req.user._id);
        if (!user) {
            logger.error("Please provide Valid User");
            return res.json({ status: false, error: "Please provide Valid User" });
        }
        
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            logger.error(`Incorrect old password for user: ${req.user.email}`);
            return res.status(401).json({ status: false, error: "Incorrect old password" });
        }
        
        user.password = newPassword;
        user.lastLogin = new Date();
        await user.save();

        const access = await user.generateAuthToken();
        
        logger.info(`Password Changed Successfully for user: ${req.user.email}`);
        
        return res.json({
            status: true,
            success: "Password changed successfully",
            data: user,
            access,
        });
    } catch (error) {
        logger.error(`Failed to change password: ${error.message}`);
        return res.status(400).json({
            status: false,
            message: "Failed to change password",
            error: error.message,
        });
    }
});

// app.get('/delete-all', async (req, res) => {
//     await User.deleteMany();
//     await Landlord.deleteMany();
//     await Renter.deleteMany();
//     await Listing.deleteMany();
//     return res.send('Deleted');
//   });

function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000);
}


module.exports = app
