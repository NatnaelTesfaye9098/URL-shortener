import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import qs from "qs"; 
import env from "dotenv";

env.config();
const app = express();
const port = process.env.PORT;
const apiUrl = process.env.API_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    try {
        const urlToShorten = req.body.url;
        const result = await axios.post(
            apiUrl,
            qs.stringify({
              url: urlToShorten, 
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
    res.render("index.ejs", { response: result.data });
  } catch (error) {
    res.render("index.ejs", { error: "Failed to shorten URL. Try again!" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
