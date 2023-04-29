import express from "express"
import mysql from 'mysql'
const app = express()
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const PORT = 3000


const connection = mysql.createConnection(config);

app.get('/', async (req, res) => {

    const names = `SELECT * FROM people`
    const namesList = connection.query(names, (err, rows, fields) => {
        if (err) return '<h3>Erro ao buscar nomes</h3>'
        const namesHtml = rows.map(row => {
            return `<h3>${row.name}</h3>`
        }).join('')
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <h2>To add a name go to /name</h2>
            ${namesHtml}
        `)
    })


    while (typeof namesList != 'string') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    res.send(namesList)
})

app.get("/:people", async (req, res) => {
    console.log(req.params)
    if (req.params.people === 'favicon.ico') return;
    const sql = `INSERT INTO people(name) values('${req.params.people}')`
    console.log("debug", { sql })
    connection.query(sql)
    const names = `SELECT * FROM people`
    const namesList = connection.query(names, (err, rows, fields) => {
        if (err) return '<h3>Erro ao buscar nomes</h3>'
        const namesHtml = rows.map(row => {
            return `<h3>${row.name}</h3>`
        }).join('')
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <h2>Nome inserido: ${req.params.people}</h2>
            ${namesHtml}
        `)
    })


    while (typeof namesList != 'string') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    connection.end()
    res.send(namesList)
})

app.listen(PORT, () => console.log('server listening on port ' + PORT))
