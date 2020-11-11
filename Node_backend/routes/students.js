var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController')

/* POST add student grade */
router.post('/add', studentController.addGrade);

/* GET users listing. */
router.get('/list', studentController.listStudents);

module.exports = router;
