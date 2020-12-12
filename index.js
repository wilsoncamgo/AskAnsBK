const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const {body, check} = require('express-validator')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(compression())
app.use(helmet())
const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://www.example.com' : '*',
}

app.use(cors(origin))
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests,
  })
  
  app.use(limiter)
  const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1,
  })
  
  app.post('/users', postLimiter, addUser)

  app.post(
    '/users',
    [
      check('id').not().isEmpty().isLength({min: 5, max: 255}).trim(),
      check('name').not().isEmpty().isLength({min: 5, max: 255}).trim(),
    ],
    postLimiter,
    (request, response) => {
      const errors = validationResult(request)
  
      if (!errors.isEmpty()) {
        return response.status(422).json({errors: errors.array()})
      }
  
      const {id, name} = request.body
  
      pool.query(
        'INSERT INTO users (id, name) VALUES ($1, $2)',
        [id, name],
        (error) => {
          if (error) {
            throw error
          }
          response.status(201).json({status: 'success', message: 'User added.'})
        },
      )
    },
  )

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addUser = (request, response) => {
  const {id, name} = request.body

  pool.query(
    'INSERT INTO users (id, name) VALUES ($1, $2)',
    [id, name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'User added.'})
    },
  )
}

app
  .route('/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})