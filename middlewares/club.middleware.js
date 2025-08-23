import jwt from "jsonwebtoken";
import users from "../models/user.model.js";
import Club from "../models/club.model.js";

export const isPresident = async (req, res, next) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ error: "Club not found" });

    if (club.president_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Access denied. Not club president" });
    }

    req.club = club;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
