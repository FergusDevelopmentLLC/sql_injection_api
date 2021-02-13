const express = require('express')
const utils = require('./utils')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//utils.createSeedData()

let db

app.get('/', (req, res, next) => {
  res.status(200).json(`Hello from node-express. The current server date/time is: ${new Date()}`)
})

app.get('/players', async (req, res, next) => {
  db = new sqlite3.Database('player.db')
  const players = await utils.getPlayers(db)
  db.close()
  res.status(200).json(players)
})

app.post('/playerByEmail', async (req, res, next) => {
  db = new sqlite3.Database('player.db')
  let emailAddress = req.body.email
  const player = await utils.getPlayerByEmail(db, emailAddress)
  db.close()
  res.status(200).json(player)
})

app.post('/playerByEmailStrong', async (req, res, next) => {
  db = new sqlite3.Database('player.db')
  let emailAddress = req.body.email
  const player = await utils.getPlayerByEmailStrong(db, emailAddress)
  db.close()
  res.status(200).json(player)
})

const server = app.listen(4060, () => {
  console.log('App listening at port %s', server.address().port)
})