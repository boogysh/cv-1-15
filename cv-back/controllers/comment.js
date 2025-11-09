
const COMMENT = require("../models/comment");

exports.createComment = (req, res) => {
  const { firstName, lastName, commentTxt, project, rating, ip } = req.body;
  const comment = new COMMENT({
    firstName,
    lastName,
    commentTxt,
    project,
    rating,
    ip
  });
  comment
    .save()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => handleError(res, error));
};


exports.getComment = (req, res, next) => {
  COMMENT.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

//  updateComment 

exports.updateComment = async (req, res) => {
  try {
    const { project, ip, rating } = req.body;

    // Vérification minimale des champs
    if (!project || !ip || rating == null) {
      return res.status(400).json({ message: "Champs manquants pour la mise à jour du rating" });
    }

    // Recherche du commentaire existant
    const existingComment = await COMMENT.findOne({ project, ip });

    if (!existingComment) {
      return res.status(404).json({ message: "Aucun commentaire trouvé pour ce projet et IP" });
    }

    // Mise à jour du rating
    existingComment.rating = rating;
    existingComment.updatedAt = new Date();

    const updatedComment = await existingComment.save();

    console.log("✅ Note du commentaire mise à jour :", updatedComment);

    return res.status(200).json({
      message: "Note du commentaire mise à jour avec succès",
      updatedComment,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du rating :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

//-----------------------------------------------------------------




// const COMMENT = require("../models/comment");

// exports.createComment = async (req, res) => {
//   try {
//     const { firstName, lastName, commentTxt, project, rating, ip } = req.body;
//     console.log("📩 Requête reçue :", req.body);

//     // // Validation simple
//     // if (!firstName || !lastName || !commentTxt || !project || !ip || rating == null) {
//     //   return res.status(400).json({ message: "Champs invalides ou rating manquant" });
//     // }

//     // Vérifie si le commentaire existe déjà pour ce projet et cette IP
//     const existingComment = await COMMENT.findOne({ project, ip });

//     if (existingComment) {
//       // Met à jour le rating uniquement (et éventuellement le texte si tu veux)
//       existingComment.rating = rating;
//       existingComment.commentTxt = commentTxt; // facultatif
//       existingComment.updatedAt = new Date();

//       const updatedComment = await existingComment.save();

//       console.log("✅ Commentaire mis à jour :", updatedComment);

//       return res.status(200).json({
//         message: "Commentaire mis à jour avec succès",
//         updatedComment,
//       });
//     }

//     // Sinon, crée un nouveau commentaire
//     const newComment = new COMMENT({
//       firstName,
//       lastName,
//       commentTxt,
//       project,
//       rating,
//       ip,
//     });

//     const savedComment = await newComment.save();

//     console.log("🆕 Nouveau commentaire enregistré :", savedComment);

//     return res.status(201).json({
//       message: "Nouveau commentaire enregistré avec succès",
//       comment: savedComment,
//     });
//   } catch (error) {
//     console.error("❌ Erreur lors de l’ajout/mise à jour du commentaire :", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// };

