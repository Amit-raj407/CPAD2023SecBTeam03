const router = require('express').Router();
const {getRecipe} = require('../controllers/PromptControllers');

router.route('/getRecipe').get( getRecipe );


module.exports = router;