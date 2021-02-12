const sqlite3 = require('sqlite3').verbose()

const createSeedData = () => {
  
  let db = new sqlite3.Database('player')

  db.serialize(() => {

    const data = [
      {
        name: 'Ruth',
        city: 'New York',
        email: 'babe@yankees.com'
      },
      {
        name: 'Jordan',
        city: 'Chicago',
        email: 'jump23@bulls.com'
      },
      {
        name: 'Brady',
        city: 'Tampa Bay',
        email: 'tbrady@buccaneers.com'
      }
    ]
  
    db.run( `
            create table if not exists  
            players (
              name TEXT,
              city TEXT,
              email TEXT
             )
            `)
  
    data.forEach((player) => {
      db.run(`INSERT INTO players (name, city, email) values ('${player.name}','${player.city}','${player.email}')`)
    })
    
    db.each("SELECT name, city, email FROM players", (err, row) => {
      console.log(`${row.name}, ${row.city}, ${row.email}`)
    })
  
  })

  db.close()
}

const getPlayers = () => {
  
  let db = new sqlite3.Database('player')
  let players = []

  db.serialize(() => {

    db.each("SELECT name, city, email FROM players", (err, row) => {
      let player = {}
      player.name = row.name
      player.city = row.city
      player.email = row.email
      players.push(player)
    })
    
  })

  db.close()

  return players

}

module.exports = { createSeedData, getPlayers }