import Event from "../models/event.model.js";
import Club from "../models/club.model.js";
import User from "../models/user.model.js";

// Permissions
export const clubRolePermissions = {
  admin: {
    canDeleteClub: true,
    canManageRoles: true,
    canInviteMembers: true,
    canRemoveMembers: true,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: true,
    canManageClubSettings: true,
    canViewAnalytics: true,
  },
  moderator: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: true,
    canRemoveMembers: true,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: true,
    canManageClubSettings: false,
    canViewAnalytics: true,
  },
  editor: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: false,
    canManageClubSettings: false,
    canViewAnalytics: false,
  },
  contributor: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canCreateEvents: true,
    canEditAllEvents: false,
    canDeleteAllEvents: false,
    canManageClubSettings: false,
    canViewAnalytics: false,
  },
};

const hasPermission = (user, permission) => {
  if (user.role === "student") return false;
  if (!user.clubRole) return false;
  return clubRolePermissions[user.clubRole]?.[permission] || false;
};

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      image_url,
      paymentRequired,
      club_id,
    } = req.body;
    const user = req.user;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !category ||
      !club_id
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    if (!hasPermission(user, "canCreateEvents")) {
      return res
        .status(403)
        .json({ error: "You do not have permission to create events" });
    }

    if (user.club_id?.toString() !== club_id) {
      return res
        .status(403)
        .json({ error: "You can only create events for your own club" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      image_url: image_url || null,
      paymentRequired: paymentRequired || false,
      club_id,
      user_id: user._id,
    });

    await Club.findByIdAndUpdate(club_id, { $push: { events: event._id } });

    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("club_id", "name category logo")
      .populate("user_id", "fullname email avatar")
      .populate("attendees.user", "fullname email avatar");

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate("club_id", "name category logo")
      .populate("user_id", "fullname email avatar")
      .populate("attendees.user", "fullname email avatar");

    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = req.user;

    if (
      event.user_id.toString() !== user._id.toString() &&
      !hasPermission(user, "canEditAllEvents")
    ) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this event" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({ message: "Event updated", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = req.user;

    if (
      event.user_id.toString() !== user._id.toString() &&
      !hasPermission(user, "canDeleteAllEvents")
    ) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.eventId);

    await Club.findByIdAndUpdate(event.club_id, {
      $pull: { events: event._id },
    });

    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
