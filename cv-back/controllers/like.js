const LIKE = require("../models/like");

exports.createLike = (req, res) => {
  const { project, ip, allMyIPs } = req.body;
  const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  console.log("6-ip:", ip);
  !allMyIPs.includes(ip) && allMyIPs.push(ip);
  console.log("allMyIPs", allMyIPs);
  //-------------------------------
  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
    // const dif1 = [1, 2, 3, 4, 5, 6].diff([3, 4, 5]);
    // console.log(dif1); // => [1, 2, 6]
  };
  //---------------

  ////////////////////////////////////////////////////////////////////
  LIKE.findOne({ project: project })
    .then((like) => {
      if (!like) {
        newLike
          .save()
          .then((newLike) => res.status(200).json(newLike))
          .catch((error) => res.status(400).json({ error }));
      } else if (like) {
        //-------------------------------------------------
        const identicIPs = like.ipList.filter((x) => allMyIPs.includes(x));
        console.log("intersection", identicIPs);
        console.log("like.ipList:", like.ipList);
        //-----------
        const filteredIPs = like.ipList.diff(identicIPs);
        console.log("IPLIST -minus- identicIps", filteredIPs);
        //-----------
        const includesIp = like.ipList.includes(ip);
        console.log("includesIp:", includesIp);
        let newLikes;
        let newIpList;
        //-----------------------------
        if (ip && identicIPs.length === 0 && !includesIp) {
          newIpList = like.ipList;
          newIpList.push(ip);
          console.log("incr-newIpList:", newIpList);
          newLikes = newIpList.length;
        } else if (ip && identicIPs.length > 0) {
          //-----------
          newIpList = filteredIPs;
          newLikes = newIpList.length;
        } else return;

        //------------------------------------------------------
        LIKE.updateOne(
          { project: project },
          {
            _id: LIKE._id,
            project: LIKE.project,
            ipList: newIpList,
            likes: newLikes,
            createdAt: LIKE.createdAt,
            updatedAt: LIKE.updatedAt,
            __v: LIKE.__v,
          }
        )
          .then((updatedLike) => {
            res.status(200).json(updatedLike);
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
exports.getLike = (req, res, next) => {
  LIKE.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(400).json({ error }));
};
