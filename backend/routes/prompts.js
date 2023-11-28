const router = require('express').Router();
const { getRecipe, getRecipeById } = require('../controllers/PromptControllers');


router.route('/getRecipe').post( getRecipe );

router.route('/getRecipeById/:id').get( getRecipeById );


module.exports = router;