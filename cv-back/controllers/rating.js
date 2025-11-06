const RATING = require("../models/rating");

exports.createRating = (req, res) => {
  const { project, ip, rating, allMyIPs } = req.body;
  const newRating = new RATING({
    project,
    ipList: ip,
    rating: rating,
    rateCount: 1,
  });
  // console.log("6-ip:", ip);
  !allMyIPs.includes(ip) && allMyIPs.push(ip);
  // console.log("allMyIPs", allMyIPs);
  //-------------------------------
  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };
  //---------------

  ////////////////////////////////////////////////////////////////////
  RATING.findOne({ project: project })
    .then((rating) => {
      if (!rating) {
        newRating
          .save()
          .then((newRating) => res.status(200).json(newRating))
          .catch((error) => res.status(400).json({ error }));
      } else if (rating) {
        //-------------------------------------------------
        const identicIPs = rating.ipList.filter((x) => allMyIPs.includes(x));
        //-----------
        const filteredIPs = rating.ipList.diff(identicIPs);
        // console.log("IPLIST -minus- identicIps", filteredIPs);
        //-----------
        const includesIp = like.ipList.includes(ip);
        console.log("includesIp:", includesIp);
        let newRateCount;
        let newIpList;
        //-----------------------------
        if (ip && identicIPs.length === 0 && !includesIp) {
          newIpList = rating.ipList;
          newIpList.push(ip);
          // console.log("incr-newIpList:", newIpList);
           newRateCount= newIpList.length;
        } else if (ip && identicIPs.length > 0) {
          //-----------
          newIpList = filteredIPs;
          newRateCount = newIpList.length;
        } else return;

        //------------------------------------------------------
        LIKE.updateOne(
          { project: project },
          {
            _id: LIKE._id,
            project: LIKE.project,
            ipList: newIpList,
            rateCount: newRateCount,
            createdAt: LIKE.createdAt,
            updatedAt: LIKE.updatedAt,
            __v: LIKE.__v,
          }
        )
          .then((updatedRating) => {
            res.status(200).json(updatedRating);
          })
          .catch((error) => res.status(400).json({ error }));
      } //else return;
    })
    .catch((error) => res.status(400).json({ error }));

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // like
  // .save()
  // .then((like) => res.status(200).json(like))
  // .catch((error) => handleError(res, error));
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};
exports.getRating = (req, res, next) => {
  RATING.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((ratings) => res.status(200).json(ratings))
    .catch((error) => res.status(400).json({ error }));
};
