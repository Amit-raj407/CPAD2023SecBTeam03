const router = require('express').Router();
const { getTasks, addTasks, updateTask, deleteTask, findTaskById } = require('../controllers/PromptControllers');

router.route('/').get( getTasks );

router.route('/addTask').post( addTasks );

router.route('/updateTask/:id').put( updateTask );

router.route('/deleteTask/:id').delete( deleteTask );

router.route('/findTaskById/:id').get( findTaskById );


module.exports = router;