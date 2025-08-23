import Event from "../models/event.model.js";
import Club from "../models/club.model.js";
import User from "../models/user.model.js";

// Role permissions
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

// Helper to get user's membership in a specific club
const getMembership = (user, clubId) => {
  return user.clubs?.find((c) => c.club_id.toString() === clubId.toString());
};

// CREATE EVENT
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

    const membership = getMembership(user, club_id);
    if (!membership) {
      return res
        .status(403)
        .json({ error: "You are not a member of this club" });
    }

    if (!clubRolePermissions[membership.clubRole]?.canCreateEvents) {
      return res.status(403).json({
        error: "You do not have permission to create events in this club",
      });
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

// GET ALL EVENTS
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

// GET SINGLE EVENT
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

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = req.user;
    const membership = getMembership(user, event.club_id);
    if (!membership) {
      return res
        .status(403)
        .json({ error: "You are not a member of this club" });
    }

    if (
      event.user_id.toString() !== user._id.toString() &&
      !clubRolePermissions[membership.clubRole]?.canEditAllEvents
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

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = req.user;
    const membership = getMembership(user, event.club_id);
    if (!membership) {
      return res
        .status(403)
        .json({ error: "You are not a member of this club" });
    }

    if (
      event.user_id.toString() !== user._id.toString() &&
      !clubRolePermissions[membership.clubRole]?.canDeleteAllEvents
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
