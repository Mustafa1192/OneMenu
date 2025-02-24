const Jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not Authenticate, login again" });
    }

    try {
        const tokenDecode = Jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;  // Store the userId in req.userId
        } else {
            return res.json({ success: false, message: "Not Authenticate, login again" });
        }
        console.log('userId:', req.body.userId); 
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

module.exports = userAuth;

// const Jwt = require("jsonwebtoken");

// const userAuth = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (!token) return res.json({ success: false, message: "Not authenticated, login again." });

//   try {
//     const decoded = Jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = decoded.id;
//     next();
//   } catch {
//     return res.json({ success: false, message: "Invalid or expired token." });
//   }
// };

// module.exports = userAuth;
