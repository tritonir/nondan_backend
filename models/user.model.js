import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    // Main role: student or club_member
    role: {
      type: String,
      enum: ["student", "club_member"],
      default: "student",
      required: true,
    },

    // If user is a club member, link them to a club
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      default: null, // null means no club yet
    },

    // Sub-role inside a club (only applies if role === "club_member")
    clubRole: {
      type: String,
      enum: ["admin", "moderator", "editor", "contributor", null],
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
