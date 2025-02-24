// Use require() instead of import
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/userModel'); 
const transporter = require('../Config/nodemailer.js');
const axios = require('axios'); // Ensure you import axios for making API calls

// API to check if the user is registered
module.exports.checkData = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user exists by email
      const user = await userModel.findOne({ email });
  
      if (!user) {
        // User not found, call /api/auth/register
        try {
          const registerResponse = await axios.post("http://localhost:5000/api/auth/register", { email });
          
          // If registration is successful, return a message
          return res.status(201).json({
            message: "User not found, registered successfully. Please proceed with OTP verification.",
            user: registerResponse.data,
          });
        } catch (registerError) {
          // Handle any errors during registration
          return res.status(500).json({ message: "Registration failed", error: registerError.message });
        }
      } else {
        // User found, proceed with /api/auth/send-verify-otp
        const otpResponse = await axios.post("http://localhost:5000/api/auth/send-verify-otp", { email });
  
        return res.status(200).json({
          message: "OTP sent successfully.",
          otpStatus: otpResponse.data,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };

// Register function
module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email }); // Correct method usage
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to OneMenu',
            text: `Welcome to our webiste. Your account has been created successfully with id: ${email}`
        }

        try {
            await transporter.sendMail(mailOption); // Ensure this is called on the correct object
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error.message);
        }

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Login function
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email }); // Correct method usage
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Logout function
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: 'Logged out' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Send Verification OTP 
module.exports.sendVerifyOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if the email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Fetch user from the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the account is already verified
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        // Generate a 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Optionally: Hash the OTP before saving for security
        // const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        // Update the user with the hashed OTP and expiry
        // user.verifyOtp = hashedOtp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // Valid for 24 hours
        await user.save();

        // Send the OTP email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. This OTP is valid for 24 hours.`,
        };

        // Send email using transporter
        await transporter.sendMail(mailOption);

        // Return success response
        return res.status(200).json({ success: true, message: "Verification OTP sent to email" });
    } catch (error) {
        console.error("Error in sendVerifyOtp:", error.message);

        // Return error response
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the OTP. Please try again later.",
        });
    }
};

// Verification OTP
module.exports.VerifyEmail = async (req, res) => {
    try {
        // Debugging: Log the request body
        console.log("Request Body:", req.body);

        const { userId, otp } = req.body;

        // Validate input
        if (!userId || !otp) {
            return res.json({ success: false, message: "Missing Details: userId and OTP are required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Check if user is authenticate
module.exports.isAuthenticate = async (req, res) => {
    try {
        return res.json({ success: true});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Send Password Reset OTP
module.exports.sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.json({ success: false, message: "Email is required" });
    }
    try {
        // Corrected: Destructuring userId from req.body
        const user = await userModel.findOne({email});

        // Validate if userId exists
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Generate a 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Update user with the OTP and expiry
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // Valid for 24 hours

        // Save user changes to the database
        await user.save();

        // Define email options
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for reset is ${otp}. Verify your account using this OTP.`,
        };

        // Send the email
        await transporter.sendMail(mailOption);

        // Send success response
        res.json({ success: true, message: "Otp sent to your email" });
    } catch (error) {
        // Handle errors
        res.json({ success: false, message: error.message });
    }
};

// Resetpassword
module.exports.resetpassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Validate input fields
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP, and new password are required" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validate the OTP
        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        // Check if OTP has expired
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear the OTP fields
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        // Save the updated user data
        await user.save();

        // Respond with success
        res.json({ success: true, message: "Password has been reset successfully" });
    } catch (error) {
        // Handle errors
        res.json({ success: false, message: error.message });
    }
};

// Fetch Admin Data
module.exports.getAdminData = async (req, res) => {
    const { email } = req.body;
  try {
    // Find the admin by email
    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Return only the username and email
    res.status(200).json({
      username: admin.name,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

