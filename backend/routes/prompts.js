const router = require('express').Router();
const { getRecipe, getRecipeById, getAllRecipes } = require('../controllers/PromptControllers');


router.route('/getRecipe').post( getRecipe );

router.route('/getRecipeById/:id').get( getRecipeById );

router.route('/getAllRecipes').get( getAllRecipes );


module.exports = router;