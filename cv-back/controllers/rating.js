const RATING = require("../models/rating");

// ⚡️ Ajouter ou mettre à jour un rating
exports.createRating = async (req, res) => {
  try {
    const { project, ip, rating, allMyIPs } = req.body;

    if (!project || !ip || typeof rating !== "number") {
      return res.status(400).json({ message: "Champs invalides" });
    }

    // 🔍 Vérifie si l’utilisateur (IP) a déjà noté ce projet
    const existingRating = await RATING.findOne({ project, ip });

    if (existingRating) {
      // 🟡 Met à jour sa note
      existingRating.rating = rating;
      await existingRating.save();

      return res.status(200).json({
        message: "Note mise à jour avec succès",
        rating: existingRating,
      });
    }

    // 🆕 Sinon crée une nouvelle note
    const newRating = new RATING({
      project,
      ip,
      rating,
      ipList: allMyIPs || [],
    });

    const saved = await newRating.save();

    return res.status(201).json({
      message: "Note enregistrée avec succès",
      rating: saved,
    });
  } catch (error) {
    console.error("Erreur lors de l’ajout/mise à jour du rating :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📥 Récupérer toutes les notes
exports.getRating = async (req, res) => {
  try {
    const ratings = await RATING.find().sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (error) {
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
