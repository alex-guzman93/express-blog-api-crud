// Importo i dati dei cibi rustici
//let menuRusticFood = require('../data/posts');
const menuRusticFood = require('../data/posts');

//index
function index(req, res) {
    //res.send('Lista dei cibi rustici');

    //Inizialmente, il menu dei cibi rustici filtrato corrisponde a quello originale
    let filteredRusticFood = menuRusticFood;

    // Filtro il menu dei cibi rustici che contengono un determinato tag 
    if (req.query.tags) {
        filteredRusticFood = menuRusticFood.filter(
            // uso tolowercase per evitare problemi,trasforma tutto in minuscolo.
            food => food.tags.toLowerCase().includes(req.query.tags.toLowerCase())
        );
    }

    // creo un nuovo oggetto con le prop che mi servono
    res.json({
        total: filteredRusticFood.length,
        data: filteredRusticFood

        // Restituisco dati in json base
        //res.json(menuRusticFood);

    });
}
//show

function show(req, res) {

    //res.send('Dettagli dei cibi rustici ' + req.params.id);

    // show per restituire ogni singolo prodotto tramite ID
    const prodotto = menuRusticFood.find(food => food.id == req.params.id);

    // se non trovo il prodotto
    if (!prodotto) {

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
    //res.send('Eliminazione del cibo rustico ' + req.params.id);
    // logica con variabile let
    //menuRusticFood= menuRusticFood.filter(food =>food.id!=req.params.id)
    //cerco il prodotto tramite id
    const prodotto = menuRusticFood.find(food => food.id == req.params.id);
    if (!prodotto) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "prodotto non esistente"
            //console.log(prodotto)


        })
    }

    // Rimuovo il cibo rustico dalla lista
    // Elimino il primo elemento a partire dall'indice
    menuRusticFood.splice(menuRusticFood.indexOf(prodotto), 1);


    //forzo status no content
    res.sendStatus(204)


}


//Esporto le funzioni del controller per usarle in router
module.exports = { index, show, store, update, modify, destroy }
