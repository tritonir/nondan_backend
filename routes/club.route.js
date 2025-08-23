import express from "express";
import { isPresident } from "../middlewares/club.middleware.js";
import userjwt from "../middlewares/user.middleware.js";
import {
  createClub,
  getClubs,
  getClub,
  updateClub,
  deleteClub,
} from "../controllers/club.controller.js";

const clubRouter = express.Router();

clubRouter.get("/", getClubs);
clubRouter.get("/:id", getClub);

clubRouter.post("/", userjwt, createClub);
clubRouter.put("/:id", userjwt, isPresident, updateClub);
clubRouter.delete("/:id", userjwt, isPresident, deleteClub);

export default clubRouter;
