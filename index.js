import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import qs from "qs"; 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    try {
        const urlToShorten = req.body.url;
        const result = await axios.post(
            "https://cleanuri.com/api/v1/shorten",
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
    console.log("Error: " + error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
