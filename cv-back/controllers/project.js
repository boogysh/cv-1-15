const Project = require("../models/project");

/** ---------------------------
 * 0️⃣ GET un projet by id
 * --------------------------- */
// controllers/projectController.js
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).lean();
    if (!project)
      return res.status(404).json({ message: "Projet introuvable" });
    res.status(200).json(project);
  } catch (err) {
    console.error("Erreur getProjectById:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

/** ---------------------------
 * 1️⃣ GET tous les projets
 * --------------------------- */
exports.getAllProjects = async (req, res) => {
  try {
    const { projectId } = req.query;
    const query = projectId ? { _id: projectId } : {};
    const projects = await Project.find(query).sort({ _id: 1 }).lean();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur getAllProjects:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

/** ---------------------------
 * 2️⃣ Crée un projet s’il n’existe pas
 * --------------------------- */
exports.createOrGetProject = async (req, res) => {
  try {
    const { project } = req.body;
    if (!project)
      return res.status(400).json({ message: "❌ project ID manquant." });

    let existingProject = await Project.findById(project);
    if (existingProject) {
      return res.status(200).json({
        message: "✅ Projet déjà existant",
        project: existingProject,
        existed: true,
      });
    }

    const newProject = new Project({
      _id: project,
      likes: [],
      comments: [],
      ratings: [],
    });
    await newProject.save();

    res.status(201).json({
      message: "✅ Nouveau projet créé",
      project: newProject,
      existed: false,
    });
  } catch (err) {
    console.error("Erreur createOrGetProject:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

/** ---------------------------
 * 3️⃣ Crée ou met à jour une NOTE
 * --------------------------- */

exports.rateProject = async (req, res) => {
  const { project, ip, rating  } = req.body;
  if (!project || !ip || typeof rating !== "number")
    return res.status(400).json({ message: "Invalid" });

  let existingProject = await Project.findById(project);
  // if (!existingProject) {
  //   existingProject = new Project({ _id: project, comments: [], ratings: [], likes: [] });
  // }
  if (!existingProject) {
    existingProject = new Project({
      _id: project,
      comments: [],
      ratings: [],
      likes: [],
    });
    await existingProject.save();
  }

  // 1️⃣ Mettre à jour ou créer la note
  const existingRating = existingProject.ratings.find((r) => r.ip === ip);
  if (existingRating) existingRating.rating = rating;
  else existingProject.ratings.push({ ip, rating });

  // // 2️⃣ Mettre à jour la note dans le commentaire si existant
  // const userComment = existingProject.comments.find((c) => c.ip === ip);
  // if (userComment) {
  //   userComment.rating = rating;
  //   userComment.updatedAt = new Date();
  // }

  await existingProject.save();
  return res.status(200).json({ project: existingProject });
};

/** ---------------------------
 * 4️⃣ Met à jour la note du commentaire associé à l’IP
 * --------------------------- */
exports.updateCommentAfterRate = async (req, res) => {
  try {
    const { project, ip, rating } = req.body;
    if (!project || !ip || typeof rating !== "number") {
      return res.status(400).json({ message: "❌ Données invalides." });
    }

    const existingProject = await Project.findById(project);
    if (!existingProject) {
      // Projet non encore voté → on ne crée rien, juste un message neutre
      return res.status(200).json({
        message: "ℹ️ Projet non voté, aucun commentaire à mettre à jour.",
        project: null,
      });
    }

    // Met à jour les commentaires existants pour cette IP
    let updated = false;
    existingProject.comments.forEach((c) => {
      if (c.ip === ip) {
        c.rating = rating;
        c.updatedAt = new Date();
        updated = true;
      }
    });

    await existingProject.save();

    res.status(200).json({
      message: updated
        ? "✅ Commentaires mis à jour avec la nouvelle note."
        : "ℹ️ Aucun commentaire existant pour cette IP.",
      project: existingProject,
    });
  } catch (err) {
    console.error("Erreur updateCommentAfterRate:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

/** ---------------------------
 * 5️⃣ Crée ou ajoute un COMMENTAIRE
 * --------------------------- */
exports.commentProject = async (req, res) => {
  try {
    const { project, firstName, lastName, commentTxt, ip, rating } = req.body;

    if (!project || !commentTxt || !ip) {
      return res
        .status(400)
        .json({ message: "❌ Données invalides pour le commentaire." });
    }

    let existingProject = await Project.findById(project);

    if (!existingProject) {
      // Créer le projet si inexistant
      existingProject = new Project({
        _id: project,
        comments: [],
        ratings: [],
        likes: [],
      });
    }

    // 🔹 Ajouter le commentaire
    existingProject.comments.push({
      firstName,
      lastName,
      commentTxt,
      ip,
      rating,
      createdAt: new Date(),
    });

    // 🔹 Sauvegarder le projet
    await existingProject.save();

    res.status(200).json({
      message: "✅ Commentaire ajouté avec succès",
      project: existingProject, // renvoie le projet complet pour Redux
    });
  } catch (err) {
    console.error("Erreur commentProject:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

/** ---------------------------
 * 6️⃣ Crée ou ajoute un LIKE
 * --------------------------- */
exports.likeProject = async (req, res) => {
  try {
    const { project, ip } = req.body;
    if (!project || !ip)
      return res
        .status(400)
        .json({ message: "❌ Données invalides pour le like." });

    let existingProject = await Project.findById(project);
    if (!existingProject) {
      // Création si le projet n’existe pas
      existingProject = new Project({
        _id: project,
        likes: [ip],
        comments: [],
        ratings: [],
      });
    } else {
      // Toggle : retirer l’IP si elle existe déjà, sinon ajouter
      if (existingProject.likes.includes(ip)) {
        existingProject.likes = existingProject.likes.filter(
          (likeIp) => likeIp !== ip
        );
      } else {
        existingProject.likes.push(ip);
      }
    }

    await existingProject.save();

    res.status(200).json({
      message: "✅ Like mis à jour avec succès",
      project: existingProject,
    });
  } catch (err) {
    console.error("Erreur likeProject:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
