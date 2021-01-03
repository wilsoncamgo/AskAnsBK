require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUserbyId = (request, response) => {
  const { id } = request.body;
  pool.query("SELECT name FROM users WHERE id=$1", [id], (error, res) => {
    if (error) {
      throw error;
    }
    response.status(200).json(res.rows);
  });
};

const addUser = (request, response) => {
  const { id, name } = request.body;

  pool.query(
    "INSERT INTO users (id, name) VALUES ($1, $2)",
    [id, name],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "User added." });
    }
  );
};
module.exports = {
  getUsers,
  getUserbyId,
  addUser
}