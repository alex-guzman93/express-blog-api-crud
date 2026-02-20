const express = require('express');
const app = express();
const port = 3000;

// Importo router dei cibi rustici
const rusticFoodRouter = require('./routers/rusticFood');

// Attivo cartella public per uso file statici
app.use(express.static('public'));

// Rotta home
app.get('/', (req, res) => {
    res.send("<h1> Server del mio blog</h1>")
})

// Istanza delle rotte per risorsa cibi rustici
app.use("/rusticFood", rusticFoodRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})