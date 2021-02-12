
const express = require('express')

const app = express()

app.use('/players', (req, res, next) => {
  
  const players = [
    {
      name: 'Ruth',
      city: 'New York'
    },
    {
      name: 'Jordan',
      city: 'Chicago'
    },
    {
      name: 'Brady',
      city: 'Tampa Bay'
    }
  ]
  
  res.status(200).json(players)
})

app.use('/', (req, res, next) => {
  res.status(200).json(`Hello from node-express. The current server date/time is: ${new Date()}`)
})

const server = app.listen(8888, () => {
  console.log('App listening at port %s', server.address().port)
})