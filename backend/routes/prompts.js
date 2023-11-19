const router = require('express').Router();
const {getRecipe} = require('../controllers/PromptControllers');

router.route('/getRecipe').post( getRecipe );


module.exports = router;