import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// This line let us use .body method
app.use(bodyParser.urlencoded({ extended: true }));

// // Custom middleware
// function bandNameGenerator(req, res, next) {
//   console.log(req.body);
//   // req.body["This is where we put the name attribute"]
//   bandName = req.body["street"] + req.body["pet"];
//   next();
// }

// // Calling custom middleware
// app.use(bandNameGenerator);

// Get request
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// // Post data
// app.post("/submit", (req, res) => {
//   res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
// });

// Listening port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
