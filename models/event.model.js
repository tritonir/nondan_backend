import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    date: { type: String, required: true }, // example: 2025-09-10
    time: { type: String, required: true }, // example: "14:30"

    location: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["technology", "sports", "arts", "academic", "social"],
      required: true,
    },

    image_url: { type: String },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },

    paymentRequired: {
      type: Boolean,
    },
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // creator (club admin)

    attendees: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        registeredAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
