const RATING = require("../models/rating");

// ⚡️ Ajouter ou mettre à jour un rating
exports.createRating = async (req, res) => {
  try {
    const { project, ip, rating, allMyIPs } = req.body;
    console.log("📩 Requête reçue :", req.body);

    // 🔍 Vérifie s’il existe déjà une note pour ce projet
    const existingRating = await RATING.findOne({ project });

    if (existingRating) {
      // 1️⃣ Retirer toutes les IPs de allMyIPs de existingRating.ipList
      const filteredExistingIPs = existingRating.ipList.filter(
        (x) => !allMyIPs.includes(x)
      );

      // 2️⃣ Ajouter uniquement l'IP actuelle
      const newIpList = [...filteredExistingIPs, ip];

      // 3️⃣ Mettre à jour dans la base
      if (filteredExistingIPs.length > 0) {
        const updatedRating = await RATING.updateOne(
          { project: project },
          {
            $set: {
              ipList: newIpList,
              rating: rating,
              rateCount: newIpList.length, // le vrai total unique
              updatedAt: new Date(),
            },
          }
        );

        console.log("✅ Note mise à jour :", updatedRating);

        return res.status(200).json({
          message: "Note mise à jour avec succès",
          updatedRating,
        });
      } else {
        console.log("⚠️ Aucune nouvelle IP à ajouter, pas de mise à jour.");
        return res.status(200).json({
          message: "L’utilisateur a déjà noté ce projet.",
          existingRating,
        });
      }
    }

    // 🆕 Sinon, crée une nouvelle note
    const newRating = new RATING({
      project,
      ip,
      rating: rating,
      ipList: allMyIPs || [ip],
      rateCount: 1,
    });

    const saved = await newRating.save();

    console.log("🆕 Nouvelle note enregistrée :", saved);

    return res.status(201).json({
      message: "Nouvelle note enregistrée avec succès",
      rating: saved,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l’ajout/mise à jour du rating :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📥 Récupérer toutes les notes
exports.getRating = async (req, res) => {
  try {
    const ratings = await RATING.find().sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des ratings :", error);
    res.status(400).json({ error });
  }
};

// const RATING = require("../models/rating");

// exports.createRating = (req, res) => {
//   const { project, ip, rating, allMyIPs } = req.body;
//   const newRating = new RATING({
//     project,
//     ipList: ip,
//     rating: rating,
//     rateCount: 1,
//   });
//   // console.log("6-ip:", ip);
//   !allMyIPs.includes(ip) && allMyIPs.push(ip);
//   // console.log("allMyIPs", allMyIPs);
//   //-------------------------------
//   Array.prototype.diff = function (a) {
//     return this.filter(function (i) {
//       return a.indexOf(i) < 0;
//     });
//   };
//   //---------------

//   ////////////////////////////////////////////////////////////////////
//   RATING.findOne({ project: project })
//     .then((rating) => {
//       if (!rating) {
//         newRating
//           .save()
//           .then((newRating) => res.status(200).json(newRating))
//           .catch((error) => res.status(400).json({ error }));
//       } else if (rating) {
//         //-------------------------------------------------
//         const identicIPs = rating.ipList.filter((x) => allMyIPs.includes(x));
//         //-----------
//         const filteredIPs = rating.ipList.diff(identicIPs);
//         // console.log("IPLIST -minus- identicIps", filteredIPs);
//         //-----------
//         const includesIp = like.ipList.includes(ip);
//         console.log("includesIp:", includesIp);
//         let newRateCount;
//         let newIpList;
//         //-----------------------------
//         if (ip && identicIPs.length === 0 && !includesIp) {
//           newIpList = rating.ipList;
//           newIpList.push(ip);
//           // console.log("incr-newIpList:", newIpList);
//            newRateCount= newIpList.length;
//         } else if (ip && identicIPs.length > 0) {
//           //-----------
//           newIpList = filteredIPs;
//           newRateCount = newIpList.length;
//         } else return;

//         //------------------------------------------------------
//         RATING.updateOne(
//           { project: project },
//           {
//             _id: RATING._id,
//             project: RATING.project,
//             ipList: newIpList,
//             rating: rating,
//             rateCount: newRateCount,
//             createdAt: RATING.createdAt,
//             updatedAt: RATING.updatedAt,
//             __v: RATING.__v,
//           }
//         )
//           .then((updatedRating) => {
//             res.status(200).json(updatedRating);
//           })
//           .catch((error) => res.status(400).json({ error }));
//       } //else return;
//     })
//     .catch((error) => res.status(400).json({ error }));

//   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   // like
//   // .save()
//   // .then((like) => res.status(200).json(like))
//   // .catch((error) => handleError(res, error));
//   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// };
// exports.getRating = (req, res, next) => {
//   RATING.find()
//     .sort({ createdAt: -1 })
//     // .sort({ clientInfo: req.clientInfo })

//     .then((ratings) => res.status(200).json(ratings))
//     .catch((error) => res.status(400).json({ error }));
// };
