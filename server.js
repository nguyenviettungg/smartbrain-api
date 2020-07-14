const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "toilatoi2",
    database: "smartbrain",
  },
});
postgres.select("*").from("users");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", signin.handleSignin(postgres, bcrypt));

app.post("/register", register.handleRegister(postgres, bcrypt));

app.get("/profile/:id", profile.handleProfile(postgres));

app.put("/image", image.handleImage(postgres));

app.post("/imageurl", image.handleApiCall());

const DATABASE_URL = process.env.DATABASE_URL

app.listen(3000, () => {
  console.log(`app is running on port ${DATABASE_URL}`);
});

