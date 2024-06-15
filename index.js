import express from "express";
import bodyParser from "body-parser";
import translate from "translator-for-you";
import fs from "fs";
import TextToSpeech from "text-to-speech-converter";
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
var prompArr =[];
var resArr =[];
// This line let us use .body method
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

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
  else if (tempLang === "Turkish") lang = "tr";
  else if (tempLang === "Dutch") lang = "nl";
  promp = req.body["text"];
  next();
}

function testSpeechGeneration(inputText) {
    const outputFilePath = "./public/test";
    // Check if the file exists and delete it if it does
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    TextToSpeech(inputText, outputFilePath);
}

// Calling custom middleware
app.use(translatorFunc);

// Get request
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/delete-history", (req, res) => {
  prompArr = [];
  resArr = [];
  res.redirect("/");
});

app.get("/play", (req, res) => {
    var audio = new Audio("test.mp3");
    audio.play();
});

// Post data
app.post("/translate", async (req, res) => {
    try {
        var translatedText = await translate(promp, lang);
        await testSpeechGeneration(translatedText);
        prompArr.push(promp);
        resArr.push(translatedText);
        res.render("translate.ejs", 
            {ans: translatedText, texts: promp, l: tempLang, arr1: prompArr, arr2: resArr});
    } catch(err){
        res.send(`<h1> Error: ${err.message} </h1>`);
    }
});

// Listening port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
