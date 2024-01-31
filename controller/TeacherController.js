//importing student model
const Student = require('../model/Student');

// Controller function for rendering the teacher login page (GET request)
const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin");
};

// Controller function for handling teacher login (POST request)
const teacher_login_post = (req, res) => {

    //******** Teacher Login Password **********//
    const correctPassword = 12345;
    if (req.body.password == correctPassword) {
        res.redirect("/teacher/option");
    }
    else {
        res.render("teacher/teacherLogin", {
            error: "Please Enter Correct Password"
        })
    }
};

// Controller function for rendering the view with all students
const teacher_viewall_get = async (req, res) => {
    const allStudents = await Student.find()
    res.render("teacher/viewall", { student: allStudents })
};

// Controller function for rendering the page to edit a student
const teacher_edit_get = async (req, res) => {
    const user = await Student.findById(req.params.id)
    res.render("teacher/edit", { user: user })
};

//Controller function for updating students details
const teacher_edit_post = async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/teacher/viewall")
};

// Controller function to delete a student
const teacher_delete_get = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/viewall")
};

// Controller function for rendering the teacher options page
const teacher_option_get = (req, res) => {
    res.render("teacher/option")
};

// Controller function for rendering the teacher add student page
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent");
};

// Controller function for handling the addition of a new student (POST request)
const teacher_add_post = async (req, res) => {
    const singleStudent = new Student({
        name: req.body.name,
        roll: req.body.roll,
        dob: req.body.dob,
        score: req.body.score
    })
    try {
        const newStudent = await singleStudent.save();
        res.render("teacher/addstudent", {
            success: "Student added successfully!",
            error: null
        });
    } catch {
        res.send("error")
    }
};

//exporting teacher controller functions
module.exports = {
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}