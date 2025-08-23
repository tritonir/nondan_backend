import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import userjwt from "../middlewares/user.middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEvent);

eventRouter.post("/", userjwt, createEvent);
eventRouter.put("/:id", userjwt, updateEvent);
eventRouter.delete("/:id", userjwt, deleteEvent);

export default eventRouter;
