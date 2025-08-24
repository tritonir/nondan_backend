import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addEventToUser,
  getUserEvents,
} from "../controllers/event.controller.js";
import userjwt from "../middlewares/user.middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEvent);

eventRouter.post("/", userjwt, createEvent);
eventRouter.put("/:id", userjwt, updateEvent);
eventRouter.delete("/:id", userjwt, deleteEvent);
eventRouter.post("/regev", userjwt, addEventToUser);
eventRouter.post("/showstev", userjwt, getUserEvents);

export default eventRouter;
