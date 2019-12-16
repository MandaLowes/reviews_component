const express = require('express');
const cors = require('cors');
const server = express();
const mysql = require('mysql');
const port = 3003;

server.use(express.json());
server.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'reviews'
  });

connection.connect((err) => {
    if (err) {
        console.error(err);
    }else {
        console.log('connection successful')
    }
});

server.get('/reviews/:id', (req, res) => {
   
    connection.query(`SELECT * FROM user_reviews WHERE id='${req.params.id}';`, (err, results) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).send(results)
        }
    })    
});

server.post('/reviews/:id', (req, res) => {
    connection.query(`INSERT INTO user_reviews (id, username,review_title, review, rating) VALUE ("${req.params.id}","${req.body.username}", "${req.body.review_title}", "${req.body.review}", ${req.body.rating});`, (err, results) => {
        if (err) {
            console.error(err);
        } else {

             res.status(200).send(results)
        }
    })
});


server.listen(port, () => {
    console.log(`listening on port${port}`)
})
