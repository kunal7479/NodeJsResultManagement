//importing student model
const Student = require('../model/Student');

// Controller function for rendering the student login page (GET request)
const student_login_get = (req, res) => {
  res.render("student/studentLogin");
};

//Student login credentials check
const student_login_post = async (req, res) => {
  const Sturoll = req.body.roll;
  const Studob = req.body.dob;
  const individualStudent = await Student.findOne({ $and: [{ roll: Sturoll }, { dob: Studob }] });
  if (!individualStudent) {
    res.render("student/studentLogin", {
      error: "Login with correct roll number and Date of Birth"
    })
  }
  res.render("student/studentView", { one: individualStudent });
};

//exporting student controller functions
module.exports = {
  student_login_get,
  student_login_post
}


