const express = require('express');
const app = express();
const port = 3000;

//importo middleware che intercetta tutte le rotte non registrate
const notFound = require('./middlewares/notFound');

// Importo router dei cibi rustici
const rusticFoodRouter = require('./routers/rusticFood');

// Attivo cartella public per uso file statici
app.use(express.static('public'));

// Registro il body-parser per "application/json"
app.use(express.json());

// Rotta home
app.get('/', (req, res) => {
    res.send("<h1> Server del mio blog</h1>");
})

// Istanza delle rotte per risorsa cibi rustici
app.use("/rusticFood", rusticFoodRouter);

// registro middlewares per gestione 404
app.use(notFound);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})