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
            food => food.tags.some(tag => tag.toLowerCase().includes(req.query.tags.toLowerCase()))
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
    //res.send('Creazione nuovo cibo rustico');

    //stampa di controllo per verificare cosa arriva dal client (postman/browser)
    console.log("Body ricevuto:", req.body);

    // genero un id unico 
    const newId = Date.now();

    //creo un nuovo oggetto usando i dati inviati dal client
    const newFood = {
        id: newId,
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients
    };

    //aggiungo il nuovo oggetto  all'array
    menuRusticFood.push(newFood);

    //controllo nel terminale l'array aggiornato
    console.log("Menu aggiornato:", menuRusticFood);

    // restituisco lo status 201 e il nuovo oggetto creato
    res.status(201).json(newFood);
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

    // primo metod logica con variabile let
    //menuRusticFood= menuRusticFood.filter(food =>food.id!=req.params.id)

    //cerco il prodotto tramite id, non e sicuro usare questo secondo metod, puo provocare bug futuri
    //const prodotto = menuRusticFood.find(food => food.id == req.params.id);

    // terzo metod Converto l'id da stringa a numero per confronto sicuro
    const id = parseInt(req.params.id);

    // Cerco l'indice del prodotto nell'array
    const index = menuRusticFood.findIndex(food => food.id === id);

    // Se il prodotto non esiste risponde 404 + oggetto di errore
    if (index === -1) {
        return res.status(404).json({
            status: 404,
            error: "Not Found",
            message: "Prodotto non esistente"
        });
    }

    // Rimuovo il cibo rustico dalla lista
    // menuRusticFood.splice(menuRusticFood.indexOf(prodotto), 1);

    // Rimuovo il prodotto dalla lista
    menuRusticFood.splice(index, 1);

    //stampa di controllo nel terminale 
      console.log("array dopo la eliminazione:", menuRusticFood)

    //forzo status , operazione riuscita , nessun contenuto
    //res.sendStatus(204)

    // Rispondo con 204: operazione riuscita, nessun contenuto
    return res.sendStatus(204);

    
}


//Esporto le funzioni del controller per usarle in router
module.exports = { index, show, store, update, modify, destroy }
