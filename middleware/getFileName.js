module.exports = (req, res, next) => {
    req.fileName = req.params.name;
    next();
}