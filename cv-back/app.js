// app.js
const express = require("express");
// const cors = require("cors");
require("dotenv").config();
require("./connect_mongodb/mongodb"); // connexion MongoDB

// ✅ Import sécurité
const applySecurityMiddleware = require("./middlewares/security");

// ✅ Import des routes
// const likeRoutes = require("./routes/like");
// const commentRoutes = require("./routes/comment");
// const ratingRoutes = require("./routes/rating");
const messageRoutes = require("./routes/message");
const projectRoutes = require("./routes/project");

const app = express();

// Parsing JSON
app.use(express.json());

// ✅ Appliquer la sécurité avant les routes
applySecurityMiddleware(app);

// ✅ CORS (optionnel, à activer si front et back sur domaines différents)
// app.use(cors({
//   origin: "*", // temporaire pour tester
//   methods: ["GET","POST","PATCH","PUT","DELETE"]
// }));
// ✅ CORS complet
// app.use(cors({
//   origin: "*", // ou ["http://localhost:3000"] pour front local
//   methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// Si tu as des routes PATCH ou PUT
// app.options("*", cors()); // gestion du preflight OPTIONS pour toutes les routes
// ✅ Routes
// app.use("/api/likes", likeRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/ratings", ratingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);

// ✅ Lancement serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
  if (error) console.error("Erreur serveur:", error);
  else console.log(`✅ Server is running on port ${PORT}`);
});
