import jwt from "jsonwebtoken";

export const adminProtect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Remove "Bearer" prefix

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      if (!decoded.isAdmin) {
        return res.status(401).json({ message: "Unauthorized: Not an admin" });
      }

      req.admin = decoded; // ✅ Attach admin data to request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};
