module.exports = (req, res, next) => {
    req.fileName = req.params.name;
    console.log(req.fileName);
    next();
}