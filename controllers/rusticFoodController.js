// Importo i dati dei cibi rustici
const menuRusticFood = require('../data/posts');

//index
function index(req, res) {
    //res.send('Lista dei cibi rustici');

   // Restituisco dati in json
   res.json(menuRusticFood);
        
}

//show

function show(req,res) {

    //res.send('Dettagli dei cibi rustici ' + req.params.id);

    // show per restituire ogni singolo prodotto tramite ID
    const prodotto = menuRusticFood.find(food => food.id == req.params.id);

    // se non trovo il prodotto
    if(!prodotto) {

        // forzo lo stato di risposta a 404
        res.status(404);

        // rispondo con oggetto di errore
        return res.json({
            error: " Not found",
            message: "Prodotto non trovato"
        })
    }

    res.json(prodotto);
}   

// store

function store(req, res) {
    res.send('Creazione nuovo cibo rustico');
}

// update

 function update(req, res) {
    res.send('Modifica integrale dei cibi rustici ' + req.params.id);
}

// modify

function modify(req, res) {
    res.send('Modifica parziale dei cibi rustici ' + req.params.id);
}

// destroy

function destroy(req, res) {
    res.send('Eliminazione del cibo rustico ' + req.params.id);
}


//Esporto le funzioni del controller per usarle in router
module.exports = { index, show,store,update,modify,destroy }
