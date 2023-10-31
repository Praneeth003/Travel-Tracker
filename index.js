import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "",
  host: "localhost",
  database: "World",
  port: 5433
});
db.connect();

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("Select country_code from visited_countries");
  console.log(result.rows);
  const countries = [];
  result.rows.forEach((i) => {
    countries.push(i.country_code);
  });
  res.render("index.ejs", {countries : countries, total: countries.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
