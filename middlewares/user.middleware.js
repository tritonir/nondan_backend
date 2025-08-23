import jwt from "jsonwebtoken";
import users from "../models/user.model.js";

const userjwt = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    try {
      const { _id } = payload;
      const user = await users.findById(_id);

      if (!user) {
        return res
          .status(401)
          .json({ error: "User not found, please login again" });
      }

      req.user = user; // attach user to request
      next(); // pass control
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

export default userjwt;
