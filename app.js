const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./config/keys").mongoURI;
const port = process.env.port || 3333;

// Routes
const UserRoute = require("./routes/UserRoute");
const NotesRoute = require("./routes/NotesRoute");
// Db connect
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    })
  )
  .catch((err) => console.log(err));

// Body parser for formatting to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
app.use(cors());

// Default route for api
app.get("/api", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to google keep clone api. Please go to /api/user route for user menu and /api/notes route for notes",
  });
});
// Route for user
app.use("/api/user", UserRoute);
// Route for notes
app.use("/api/notes", NotesRoute);

//Serve static assets
if (process.env.NODE_ENV === "production") {
  //Set static file
  app.use(express.static("keep_frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "keep_frontend", "build", "index.html")
    );
  });
}
