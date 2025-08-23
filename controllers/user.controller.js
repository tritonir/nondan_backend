import users from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  try {
    const { fullname, email, password, role, avatar } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashpass = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      fullname,
      email,
      password: hashpass,
      avatar: avatar || null,
      role: role || "student",
      clubs: [],
    });

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await users
      .findOne({ email })
      .populate("clubs.club_id", "name");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        clubs: user.clubs,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
};
