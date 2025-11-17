// migrateProjectsToCV.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

async function migrate() {
  const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
  const uri = `mongodb+srv://boogysh:${password}@cluster0.b69zikv.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("🔹 Connexion établie avec MongoDB Atlas");

    const oldDB = client.db("test"); // base existante
    const newDB = client.db("test"); // base cible

    // Récupération de tous les projectIds
    const commentProjects = await oldDB
      .collection("comments")
      .distinct("project");
    const likeProjects = await oldDB.collection("likes").distinct("project");
    const ratingProjects = await oldDB
      .collection("ratings")
      .distinct("project");

    const allProjectIds = Array.from(
      new Set([...commentProjects, ...likeProjects, ...ratingProjects])
    );
    console.log(`📦 ${allProjectIds.length} projets détectés`);

    for (const pid of allProjectIds) {
      // --- Likes ---
      const likesDocs = await oldDB
        .collection("likes")
        .find({ project: pid })
        .toArray();

      const likes = likesDocs.flatMap((doc) => {
        if (!Array.isArray(doc.ipList)) return [];
        return doc.ipList.filter((ip) => typeof ip === "string");
      });

      // --- Comments ---
      const comments = await oldDB
        .collection("comments")
        .find({ project: pid })
        .project({ project: 0 })
        .sort({ createdAt: -1 })
        .toArray();

      // --- Ratings ---
      const ratingsDocs = await oldDB
        .collection("ratings")
        .find({ project: pid })
        .project({ project: 0, createdAt: 0, updatedAt: 0 })
        .toArray();

      const ratings = ratingsDocs.flatMap((doc) => {
        if (!Array.isArray(doc.ipList)) return [];
        return doc.ipList
          .filter(
            (i) => typeof i.ip === "string" && typeof i.rating === "number"
          )
          .map((i) => ({ ip: i.ip, rating: i.rating }));
      });

      // --- Document final (ordre : likes, comments, ratings, migratedAt) ---
      const projectDoc = {
        _id: pid, // _id peut être mis en dernier si tu veux, MongoDB gère l'index
        likes,
        comments,
        ratings,
        migratedAt: new Date(),
      };

      // --- Insertion / mise à jour ---
      await newDB
        .collection("projects")
        .updateOne({ _id: pid }, { $set: projectDoc }, { upsert: true });

      console.log(
        `✅ Projet ${pid} migré (${likes.length} likes, ${comments.length} comments, ${ratings.length} ratings)`
      );
    }

    console.log("🎉 Migration terminée avec succès !");
  } catch (error) {
    console.error("❌ Erreur pendant la migration :", error);
  } finally {
    await client.close();
    console.log("🔒 Connexion MongoDB fermée");
  }
}

migrate();
