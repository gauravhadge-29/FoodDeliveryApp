import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) => {
    console.log("Authenticating request...");
    console.log("Request headers:", req.headers);
    const {token} = req.headers;
    console.log("Extracted token: kkk", token);

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized login again" });
    }

    try {
        console.log("Verifying token...");
        const tokendecode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token decoded:", tokendecode);
        req.body.userId = tokendecode.id;
        next();
    } catch (error) {
        console.log("Error in auth middleware", error);
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }

}

export default authMiddleware;