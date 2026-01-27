const express = require('express')

const middleWare = require('../middleware/AuthMiddleware');

const taskController = require('../controllers/taskControllers')

const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/register' , authController.register);

router.post('/login' , authController.login);

router.get('/getUser' , middleWare , authController.getUser);

router.post('/createTask' ,middleWare ,taskController.createTask);

router.get('/getTasks' ,middleWare , taskController.getTasks );

router.put('/updateTask' , middleWare, taskController.updateTask);

router.delete('/deleteTask', middleWare , taskController.deleteTask);

module.exports = router;