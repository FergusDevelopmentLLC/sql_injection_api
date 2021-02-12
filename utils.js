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
    
    db.each("SELECT name, city, email FROM players", function(err, row) {
      console.log(`${row.name}, ${row.city}, ${row.email}`)
    })
  
  })

  db.close()
}

module.exports = { createSeedData }