// cleanAndReorderProjects.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

async function cleanAndReorder() {
  const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
  const uri = `mongodb+srv://boogysh:${password}@cluster0.b69zikv.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("🔹 Connecté à MongoDB");

    const db = client.db("test");
    const projects = db.collection("projects");

    const docs = await projects.find({}).toArray();
    console.log(`📦 ${docs.length} projets trouvés`);

    for (const doc of docs) {
      const now = new Date();

      // 🔥 Supprime migratedAt
      const migratedAt = doc.migratedAt;
      await projects.updateOne(
        { _id: doc._id },
        { $unset: { migratedAt: "" } }
      );

      // 📌 createdAt = migratedAt (si existait), sinon maintenant
      const createdAt = doc.createdAt || migratedAt || now;

      // 📌 updatedAt = maintenant si manquant
      const updatedAt = doc.updatedAt || now;

      // 📌 Recrée le document avec l'ordre propre
      const reorderedDoc = {
        _id: doc._id,
        likes: Array.isArray(doc.likes) ? doc.likes : [],
        comments: Array.isArray(doc.comments) ? doc.comments : [],
        ratings: Array.isArray(doc.ratings) ? doc.ratings : [],
        createdAt,
        updatedAt,
      };

      // 🔄 Remplace complètement le document
      await projects.replaceOne({ _id: doc._id }, reorderedDoc);

      console.log(`✔️ ${doc._id} réorganisé proprement`);
    }

    console.log("🎉 Nettoyage + réorganisation terminés !");
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await client.close();
    console.log("🔒 Connexion fermée");
  }
}

cleanAndReorder();
