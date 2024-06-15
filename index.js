import express from "express";
import bodyParser from "body-parser";
import translate from "translator-for-you";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var lang ="";
var promp ="";
var out ="";
var errType ="";
var tempLang ="";
// This line let us use .body method
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware
function translatorFunc(req, res, next) {
  tempLang = req.body["language"];
  if (tempLang === "Hindi") lang = "hi";
  else if (tempLang === "Hindi") lang = "hi";
  else if (tempLang === "Arabic") lang = "ar";
  else if (tempLang === "French") lang = "fr";
  else if (tempLang === "German") lang = "de";
  else if (tempLang === "Italian") lang = "it";
  else if (tempLang === "Japanese") lang = "ja";
  else if (tempLang === "Korean") lang = "ko";
  else if (tempLang === "Russian") lang = "ru";
  else if (tempLang === "Spanish") lang = "es";
  else if (tempLang === "Turkish") lang = "hi";
  else if (tempLang === "Dutch") lang = "nl";
  

  promp = req.body["text"];
  translate(promp, lang)
    .then((result) => (out = result))
    .catch((err) => (errType = err));
  next();
}

// Calling custom middleware
app.use(translatorFunc);

// Get request
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Post data
app.post("/translate", (req, res) => {
    setTimeout(() => {
        res.send(`<h1>Translation: ${out}</h1>`);
    }, 500);
  
});

// Listening port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
