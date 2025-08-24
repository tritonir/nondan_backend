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

    // Main role is optional now, could be inferred from clubs
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // Array of club memberships with role per club
    clubs: [
      {
        club_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Club",
          required: false,
        },
        clubRole: {
          type: String,
          enum: ["admin", "moderator", "editor", "contributor"],
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
