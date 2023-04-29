const express = require('express')

const app = express()
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Mendes')`
connection.query(sql)
connection.end()
app.get('/', (req, res) => {
    res.send('<h1>Mendes</h1>')
})

app.listen(3000)