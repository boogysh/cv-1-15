const express = require("express");
const app = express();
const cors = require("cors"); // tu peux la garder, mais on utilisera celle du middleware
require("dotenv").config();
require("./connect_mongodb/mongodb");

// ✅ Import de la sécurité
const applySecurityMiddleware = require("./middlewares/security");

// Routes
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const messageRoutes = require("./routes/message");
const ratingRoutes = require("./routes/rating");

// Parsing
app.use(express.json());

// ✅ Appliquer la sécurité AVANT les routes
applySecurityMiddleware(app);

// ✅ Routes
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ratings", ratingRoutes);

// ✅ Lancement du serveur
app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`✅ Server is running on port ${process.env.PORT}`);
});



// const express = require("express");
// const app = express();
// const cors = require("cors");

// //requires routes
// const likeRoutes = require("./routes/like");
// const commentRoutes = require("./routes/comment");
// const messageRoutes = require("./routes/message");
// const ratingRoutes = require("./routes/rating");

// require("dotenv").config();
// //Connecting to mongoDB  // after dotenv
// require("./connect_mongodb/mongodb");
// //Parsing
// app.use(express.json()); //const bodyParser = require("body-parser");
// app.use(cors());

// // //Setting routes
// app.use("/api/likes", likeRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/ratings", ratingRoutes);

// app.listen(process.env.PORT, (error) => {
//   error
//     ? console.log(error)
//     : console.log(`Server is running on port ${process.env.PORT}`);
// });
