const express = require("express");
const app = express();
const cors = require("cors");

//requires routes
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const messageRoutes = require("./routes/message");
const ratingRoutes = require("./routes/rating");

require("dotenv").config();
//Connecting to mongoDB  // after dotenv
require("./connect_mongodb/mongodb");
//Parsing
app.use(express.json()); //const bodyParser = require("body-parser");
app.use(cors());

// //Setting routes
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ratings", ratingRoutes);

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running on port ${process.env.PORT}`);
});
