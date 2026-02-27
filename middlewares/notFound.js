
function notFound(req, res, next) {
    //se nessuna rotta risponde, restituisce errore 404
    res.status(404).json({
        error: "Not Found",
        message: "Route not found"
    });
};

module.exports = notFound;