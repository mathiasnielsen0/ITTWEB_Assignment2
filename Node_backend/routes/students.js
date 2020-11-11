var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController')

/* GET add student form */
router.get('/add', studentController.addStudentForm);

/* POST add student form */
router.post('/add', studentController.addGrade);

/* GET users listing. */
router.get('/list', studentController.listStudents);

module.exports = router;
