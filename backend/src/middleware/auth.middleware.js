import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export async function protectAdmin(req, res, next) {
  try {
    const token = req.cookies.admin_access_token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, error: "Access token is missing. Please log in." });
    }

    // Verify JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, error: "Access token is invalid or expired." });
      }

      // Add admin info to request object
      req.admin = decoded;
      next();
    });
  } catch (error) {
    console.error("Protect route error:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}
