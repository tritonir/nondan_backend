import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: true,
      enum: ["technology", "sports", "arts", "academic", "social"],
      trim: true,
    },

    logo: {
      type: String,
      default: null,
    },

    banner: {
      type: String,
      default: null,
    },

    colors: {
      primary: {
        type: String,
        default: null,
      },
      secondary: {
        type: String,
        default: null,
      },
    },

    president_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    socialLinks: {
      website: String,
      instagram: String,
      facebook: String,
      twitter: String,
      _id: false,
    },

    contact: {
      email: String,
      phone: String,
      _id: false,
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
