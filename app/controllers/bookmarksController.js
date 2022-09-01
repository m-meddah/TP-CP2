const dataMapper = require('../dataMapper');

const bookmarksController = {

  bookmarksPage(request, response) {
    const figurines = request.session.bookmarks;
    response.render('favoris', { figurines });
  },

  async bookmarksAdd(request, response, next) {
    try {
      const figurineId = parseInt(request.params.id, 10);

      if (Number.isNaN(figurineId)) {
        next();
      }

      if (!request.session.bookmarks) {
        request.session.bookmarks = [];
      }

      const isBookmarked = request.session.bookmarks.find((figurine) => figurine.id === figurineId);

      if(!isBookmarked){
        const figurine = await dataMapper.getOneFigurine(figurineId);
        request.session.bookmarks.push(figurine);
      }

      response.redirect('/bookmarks');
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  },

  bookmarksDelete(request, response, next){
    try {
      const figurineId = parseInt(request.params.id, 10);

      if (Number.isNaN(figurineId)) {
        next();
      }

      // let figurineIndexToDelete;
      request.session.bookmarks = request.session.bookmarks.filter((figurine) => figurine.id !== figurineId);

      response.redirect('/bookmarks');
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  }

};


module.exports = bookmarksController;
