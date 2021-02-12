const sqlite3 = require('sqlite3').verbose()
const createSeedData = () => {
  
  let db = new sqlite3.Database('player.db')

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

const getPlayers = (db) => {
  return new Promise(resolve => {
    let data = []
    db.all('SELECT name, city, email FROM players', [] , (err, rows) => {
      if(rows && rows.length > 0) rows.forEach((row)=> data.push(row))
      resolve(data)
    })
  })
}


const getPlayerByEmail = (db, email) => {
  return new Promise(resolve => {
    let data = []
    let sql = `SELECT name, city, email FROM players WHERE email='${email}'`
    // console.log('sql', sql)
    db.all(sql, [] , (err, rows) => {
      if(rows && rows.length > 0) rows.forEach((row)=> data.push(row))
      resolve(data)
    })

  })
}

const getPlayerByEmailStrong = (db, email) => {
  return new Promise(resolve => {
    let data = []
    let sql = `SELECT name, city, email FROM players WHERE email = ?`
    // console.log('sql', sql)
    db.all(sql, [email] , (err, rows) => {
      if(rows && rows.length > 0) rows.forEach((row)=> data.push(row))
      resolve(data)
    })

  })
}

module.exports = { createSeedData, getPlayers, getPlayerByEmail, getPlayerByEmailStrong }