// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createOrGetProject,
  rateProject,
  updateCommentAfterRate,
  commentProject,
  likeProject,
  getProjectById
} = require("../controllers/project");

// Lecture
router.get("/", getAllProjects);

// Création / récupération
router.post("/", createOrGetProject);

// Actions utilisateur
router.patch("/rate", rateProject);
router.patch("/comments/rate", updateCommentAfterRate); 
router.patch("/comment", commentProject);
router.patch("/like", likeProject);
router.get("/:id", getProjectById); 


module.exports = router;
