let students = []; 

/* GET add student form */
module.exports.addStudentForm = function (req, res) {
    console.log("studentcontroller GET FORM")
    res.render('students-add', {
        title: 'students-add'
    });
};

/* POST add student form */
module.exports.addGrade = async (req,res) => {
    console.log("studentcontroller POST")
    console.log(req.body.name + ", " + req.body.grade)
    let student = {name: req.body.name, grade: req.body.grade};
    students.push(student);
    res.send("OK");
}

/* GET list of students */
module.exports.listStudents = function (req, res) {
    console.log("studentcontroller GET")
    res.render('students-list', {
        title: 'students-list',
        students
    });
};