const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const port = 5000;
const host = "localhost";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATBASE,
  port: process.env.PGPORT
});



async function fetchRestaurants() {
  let client = await pool.connect()
  let response = await client.query("SELECT * FROM RESTAURANTS");
  await client.release();
  return response.rows;
}

async function fetchRestaurant(id) {
  let client = await pool.connect()
  let response = await client.query("SELECT * FROM RESTAURANTS WHERE restaurants.id = $1", [id]);
  await client.release();
  return response.rows[0];
}

async function fetchRestaurantsByTerm(search) {
  let client = await pool.connect()
  search = `%${search}%`;
  let response = await client.query("SELECT * FROM RESTAURANTS WHERE name LIKE $1", [search]);
  await client.release();
  return response.rows;
}

async function fetchReviews(id) {
  let client = await pool.connect()
  let statement = "SELECT * FROM reviews INNER JOIN users " +
                  "ON users.id = reviews.user_id " + 
                  "INNER JOIN items ON items.id = reviews.item_id " +
                  "INNER JOIN restaurants ON restaurants.id = items.restaurant_id " +
                  "WHERE restaurants.id = $1";
  let response = await client.query(statement, [id]);
  await client.release();
  return response.rows;
}




app.use(express.urlencoded({
  extends: true
}));

app.use(cors());

app.get("/restaurants", async (req, res) => {
  let response = await fetchRestaurants();
  let response2 = await fetchRestaurants({
    column: "id",
    value: 1
  });
  return res.status(200).json({"places": response});
})


app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  let response = await fetchRestaurant(id)
  return res.status(200).json(response);
});


app.get("/search", async (req, res) => {
  let { name } = req.query;
  let response = await fetchRestaurantsByTerm(name);
  return res.status(200).json({places: response});

});


 
app.get("/restaurants/:id/reviews", async (req, res) => {
  let id = req.params.id;
  let response = await fetchReviews(id);
  return res.status(200).json({items: response});
}); 

//app.post("restaurants/:id/reviews/new")


//app.get("/search")

app.listen(port, host, ()=> {
  console.log("listening to port 5000...");
});