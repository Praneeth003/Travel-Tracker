import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "Kpkpkp@003",
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

app.post("/add", async(req, res) => {
  const enteredCountry = req.body["country"];
  console.log(enteredCountry);
  
  const result = await db.query("Select country_code from countries where country_name = $1", [enteredCountry]);
  console.log(result.rows);
  
  if(result.rows.length != 0){
    const data = result.rows[0];
    const countryCode = data.country_code;
    console.log(countryCode);
    console.log("qwerty");
    await db.query("insert into visited_countries (country_code) values($1)", [countryCode]);
    res.redirect("/");
  }
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
