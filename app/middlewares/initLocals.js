module.exports = (req, res, next) => {
    res.locals.pageDescription = 'Site de ventes de figurines de Final Fantasy VII';
    res.locals.pageTitle = `O'Fig - un magasin de figurines`;
    next();
}