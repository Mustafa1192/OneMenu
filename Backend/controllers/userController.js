const userModel = require('../models/userModel');

module.exports.getUserData = async (req, res) => {
    const { email } = req.body; // Destructure email from the request body

    // Check if email is provided
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        // Fetch user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Return user data
        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        // Log the error for debugging
        console.error("Error in getUserData:", error);

        // Handle errors
        return res.json({ success: false, message: error.message });
    }
};
