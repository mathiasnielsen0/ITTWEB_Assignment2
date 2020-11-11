var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController')

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ['RS256'],
userProperty: 'payload'
});

/* POST add student grade */
router.post('/add', auth, studentController.addGrade);

/* GET users listing. */
router.get('/list', auth, studentController.listStudents);

module.exports = router;
