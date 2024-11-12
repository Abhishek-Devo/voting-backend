// Importing jwt to verify the token
const jwt = require("jsonwebtoken");

// Middleware function to check if a user has a valid token
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        console.log("No Authorization header found");
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log("Authorization header format incorrect");
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adding the user's ID from the token to the request object
        req.userId = decoded.userId;
        console.log("Token verified. User ID:", req.userId);

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Invalid token:", error.message);
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = verifyToken;
