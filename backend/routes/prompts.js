const router = require('express').Router();
const { getRecipe, getRecipeByImage } = require('../controllers/PromptControllers');

const multer = require('multer');
const path = require('path');


// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.route('/getRecipe').post( getRecipe );

router.route('/getRecipeByImage').post( upload.single('photo'), getRecipeByImage );


module.exports = router;