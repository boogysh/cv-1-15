const mongoose = require("mongoose");

// --- Sous-schémas propres et simples ---

// Chaque commentaire contient les infos de l’auteur et le texte
const CommentSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    commentTxt: { type: String, required: true, trim: true },
    ip: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true } // => ajoute createdAt et updatedAt automatiquement
);

// Chaque note contient simplement l’adresse IP et la note
const RatingSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { _id: false } // on n’a pas besoin d’un _id pour chaque note
);

// Le schéma principal du projet
const ProjectSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // ex: "pr3-stade"

    // Liste des IPs ayant liké le projet
    likes: {
      type: [String],
      default: [],
      validate: [Array.isArray, "likes must be an array of IP strings"],
    },

    // Liste des commentaires
    comments: {
      type: [CommentSchema],
      default: [],
    },

    // Liste des notes
    ratings: {
      type: [RatingSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
