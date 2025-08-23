import Club from "../models/club.model.js";
import User from "../models/user.model.js";

export const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      logo,
      banner,
      colors,
      socialLinks,
      contact,
    } = req.body;

    if (!name || !description || !category) {
      return res
        .status(400)
        .json({ error: "Name, description, and category are required" });
    }

    const newClub = await Club.create({
      name,
      description,
      category,
      logo: logo || null,
      banner: banner || null,
      colors: colors || {},
      president_id: req.user._id,
      socialLinks: socialLinks || {},
      contact: contact || {},
      members: [req.user._id],
      followers: [],
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { clubs: { club_id: newClub._id, clubRole: "admin" } },
      role: "club_member",
    });

    res.status(201).json({ message: "Club created", club: newClub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create club" });
  }
};

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate("president_id", "fullname email avatar")
      .populate("members", "fullname email avatar")
      .populate("followers", "fullname email avatar")
      .populate("events", "title date status");
    res.json(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

export const getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId)
      .populate("president_id", "fullname email avatar")
      .populate("members", "fullname email avatar")
      .populate("followers", "fullname email avatar")
      .populate("events", "title date status");
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.json(club);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch club" });
  }
};

export const updateClub = async (req, res) => {
  try {
    const updates = req.body;
    const club = req.club;

    Object.assign(club, updates);
    await club.save();

    res.json({ message: "Club updated", club });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update club" });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const club = req.club;
    await club.remove();
    res.json({ message: "Club deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete club" });
  }
};
