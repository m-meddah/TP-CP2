const express = require('express');

const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article/:id', mainController.articlePage);

// page favoris
router.get('/bookmarks', bookmarksController.bookmarksPage );

router.get('/bookmarks/add/:id', bookmarksController.bookmarksAdd );

router.get('/bookmarks/delete/:id', bookmarksController.bookmarksDelete );

router.use((_, response) => {
    response.status(404).send('page 404');
});
 
module.exports = router;