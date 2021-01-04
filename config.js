require('dotenv').config()

const { request } = require('express')
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
const getTopics = (request, response) => {
  pool.query("SELECT * FROM topics", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}
const getQuestionsbyTopic = (request, response) => {
  const idTopic = parseInt(request.params.idTopic);
  pool.query("SELECT * FROM questions WHERE topic_id=$1", [idTopic], (error, res) => {
    if (error) {
      throw error;
    }
    response.status(200).json(res.rows);
  });
}
const getUserbyId = (request, response) => {
  const id = request.params.id;
  pool.query("SELECT * FROM users WHERE id=$1", [id], (error, res) => {
    if (error) {
      throw error;
    }
    response.status(200).json(res.rows);
  });
};

const addQuestion = (request, response) => {
  const { user_id, topic_id, question, date_sumb } = request.body;
  pool.query(
    "INSERT INTO questions (user_id, topic_id, question, date_sumb) VALUES ($1, $2, $3, $4)",
    [user_id, topic_id, question, date_sumb],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Question Added added." });
    }
  );
}
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
  getUserbyId,
  addUser,
  getTopics,
  getQuestionsbyTopic,
  addQuestion
}