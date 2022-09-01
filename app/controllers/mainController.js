const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  async homePage(request, response) {
    try {
      let figurines;
      if (request.query.category) {
        figurines = await dataMapper.getFigurinesByCategory(request.query.category);
      } else {
        figurines = await dataMapper.getAllFigurines();
      }
      const categories = await dataMapper.getCategories();
      response.render('accueil', { figurines, categories });
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  },

  // méthode pour la page article
  async articlePage(request, response, next) {
    try {
      const id = parseInt(request.params.id, 10);

      if (Number.isNaN(id)) {
        next();
      }
      const figurine = await dataMapper.getOneFigurine(id);

      if (!figurine) {
        next();
      }
      const categories = await dataMapper.getCategories();

      response.render('article', {
        figurine,
        categories,
        pageDescription: `Fiche produit de la figurine ${figurine.name}`,
        pageTitle: `${response.locals.pageTitle} - ${figurine.name}`
      });
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  }

};

module.exports = mainController;
