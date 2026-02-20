// richiamo istanza di framework Express
const express = require('express');
// creiamo un istanza dell'oggetto rotte di Express
const router = express.Router();

// Importo crontroller dei cibi rustici
const rusticFoodController = require('../controllers/rusticFoodController');

// Rotte di CRUD
// index
router.get('/',rusticFoodController.index);
    
 
// show
router.get('/:id', rusticFoodController.show);

// store
router.post('/', rusticFoodController.store);

// update
router.put('/:id', rusticFoodController.update);

// modify
router.patch('/:id', rusticFoodController.modify );

// destroy
router.delete('/:id', rusticFoodController.destroy );

// Esporto l'istanza delle rotte
module.exports = router;