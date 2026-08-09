const courseModel = require("../models/course-model");
const StudentModel = require("../models/student-model");
const ratingModel = require("../models/rating-model");
const upload = require("../config/multer_config");

const adminForm = async (req, res) => {

  const {
    name,
    bio,
    title,
    subtitle,
    price,
    description,
    category,
    faqs,
    highlights,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  try {
    await courseModel.create({
      instructor_name: name,
      instructor_bio: bio,
      course_title: title,
      course_sub_title: subtitle,
      course_desc: description,
      course_price: Number(price),
      course_category: category,
      instructor_image: req.file.buffer,
      highlights: JSON.parse(highlights),
      faqs: JSON.parse(faqs),
    });
    return res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.log("Error in course adding", error);
    return res.status(500).json({ message: "Failed to add course" });
  }
};

const adminDeleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    await courseModel.findByIdAndDelete(id);

    await StudentModel.updateMany(
      { subjects: id },
      { $pull: { subjects: id } }
    );

    await ratingModel.deleteMany({ course_name: id });

    return res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.log("Error in course deletion", error);
    return res.status(500).json({ message: "Failed to delete course." });
  }
};

module.exports = {
  adminForm,
  adminDeleteCourse,
};
