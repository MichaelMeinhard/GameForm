const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/about', (req, res) => {
    res.send('Shrek Jump')
    res.end();
});

app.get('/save', (req, res) => {
    let player = req.query.player;
    let score = req.query.scoreP;
    res.send(`Hráč: ${player} | body: ${score}`);
    res.end();
});

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/save', urlencodedParser, (req, res) => {
    let player = req.body.player;
    let score = req.body.score;
    let date = new Date();
    let str = `\n${player},${score},${date.toLocaleDateString()},${date.toLocaleTimeString()}`;
    fs.appendFile('./data/result.csv', str, function(err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
               success: false,
               message: 'Byla zjištěna chyba při zápisu do souboru' 
            });
        }
    });
    res.redirect(301, '/');
});

app.get('/results', (req, res) => {
    csv().fromFile('./data/result.csv')
    .then(data => {
        console.log(data);
        res.render('results.pug', {'players':data, 'nadpis': 'Výsledky'});
    })
    .catch(err => {
        console.log(err);
    })
});


app.listen(port, () => {
    console.log(`Server jede na portu ${port}`);
});