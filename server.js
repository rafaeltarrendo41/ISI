require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const sanitizer = require('express-sanitizer');
const { request } = require('express');


app.use(bodyParser.json({
    limit: '50mb'
}), bodyParser.urlencoded({
    extended: true
}));

app.use(sanitizer());
//app.use(validator());

const dirName = __dirname;
app.use(express.static(dirName));

const urlBase = `https://wtransnet-face.herokuapp.com`;
const version = 1.0;

app.set('view engine', 'ejs');
app.set('views', '')

app.use((req, res, next) => {
    if(req.header('x-forwarded-proto') !== 'https'){
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next()
    }
})

app.get("/register", (request, response) => {
    response.set('Content-Type', 'text/html');
    response.render(`${dirName}/registo`, {
        urlBase: urlBase,
        ver: version
    });
})

app.get("/login", (request, response) => {
    response.set('Content-Type', 'text/html');
    response.render(`${dirName}/Login`, {
        urlBase: urlBase,
        ver: version
    });
})

app.get("/carga", (request, response) => {
    response.set('Content-Type', 'text/html');
    response.render(`${dirName}/publicarCarga`, {
        urlBase: urlBase,
        ver: version
    });
})

app.get("/transporte", (request, response) => {
    response.set('Content-Type', 'text/html');
    response.render(`${dirName}/publicarTransporte`, {
        urlBase: urlBase,
        ver: version
    });
})

app.get("/admin", (request, response) => {
    response.set('Content-Type', 'text/html');
    response.render(`${dirName}/admin`, {
        urlBase: urlBase,
        ver: version
    });
})



app.listen(process.env.PORT, () => console.log(`Node server listening on port ${process.env.PORT}!`));