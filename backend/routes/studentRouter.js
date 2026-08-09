const express = require("express");
const router = express.Router();
const StudentModel = require("../models/student-model");
require("dotenv").config();
const nodemailer = require("nodemailer");
const courseModel = require("../models/course-model");
const mongoose = require("mongoose");
const ratingModel = require("../models/rating-model");
const userModel = require("../models/user-model");
const { checkForAuthentication } = require("../middlewares/checkForAuthentication");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
  },
});

// Verify SMTP credentials on startup and log the result clearly.
transporter.verify((error) => {
  if (error) {
    console.error(
      "Email NOT configured correctly. Enrollment confirmation emails will not be sent. Error:",
      error.message
    );
  } else {
    console.log("Email transporter is ready - enrollment emails enabled.");
  }
});

const sendEnrollmentEmail = async (fullName, email, course_title) => {
  const mailOptions = {
    from: `"EduLearn" <${process.env.MY_EMAIL}>`,
    to: email, // Send email to the enrolled user
    subject: `Enrollment Confirmed: ${course_title} 🎉`,
    text: `Dear ${fullName},

You have successfully enrolled in the ${course_title} course!

Here's what's next:
- Log in to your EduLearn account and navigate to the Courses page.
- Open the course details to review the curriculum and highlights.
- Start learning at your own pace and track your progress.

If you have any questions, feel free to reach out to us anytime.

Thank you for joining us!
Best regards,
The EduLearn Team`,
    html: `
    <div style="margin:0;padding:0;background:#f6f7fb;font-family:Montserrat,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(30,41,59,0.08);">
              <tr>
                <td style="background:linear-gradient(120deg,#6d5ae6,#e91367);padding:28px 32px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.02em;">EduLearn</h1>
                  <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:13px;">Learn Anytime, Anywhere</p>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 16px;color:#1e293b;font-size:15px;line-height:1.6;">Dear <strong>${fullName}</strong>,</p>
                  <p style="margin:0 0 16px;color:#1e293b;font-size:15px;line-height:1.6;">
                    Congratulations! 🎉 You have successfully enrolled in
                  </p>
                  <p style="margin:0 0 20px;padding:14px 18px;background:#eeebff;border-left:4px solid #6d5ae6;border-radius:8px;color:#5a47d6;font-size:17px;font-weight:700;">
                    ${course_title}
                  </p>
                  <p style="margin:0 0 8px;color:#334155;font-size:14px;font-weight:700;">Here's what's next:</p>
                  <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                    <tr>
                      <td style="padding:4px 0;color:#475569;font-size:14px;line-height:1.6;">1. Log in to your EduLearn account and open the Courses page.</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;color:#475569;font-size:14px;line-height:1.6;">2. Review the course curriculum, highlights, and instructor details.</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;color:#475569;font-size:14px;line-height:1.6;">3. Start learning at your own pace and track your progress.</td>
                    </tr>
                  </table>
                  <p style="margin:0 0 8px;color:#475569;font-size:14px;line-height:1.6;">If you have any questions, feel free to reach out to us anytime.</p>
                  <p style="margin:24px 0 0;color:#64748b;font-size:13px;line-height:1.6;">
                    Best regards,<br/>
                    <strong style="color:#1e293b;">The EduLearn Team</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#f8f9fd;padding:16px 32px;text-align:center;border-top:1px solid #e6e8f0;">
                  <p style="margin:0;color:#94a3b8;font-size:12px;">© ${new Date().getFullYear()} EduLearn · Learn Anytime, Anywhere</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send enrollment email:", error.message);
    return false;
  }
};

router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, city, country, courseId } = req.body;
    const existinguser = await userModel.findOne({ email });
    if (!existinguser) {
      return res.status(401).json({ message: "Enter valid email" });
    }
    // Check if the student exists by email
    const course = await courseModel.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    const { course_title } = course;
    const student = await StudentModel.findOne({ email });

    let message;
    let status;

    if (student) {
      // Check if the course is already enrolled
      if (!student.subjects.some((subject) => subject.toString() === courseId)) {
        student.subjects.push(courseId); // Add new course to subjects
        await student.save(); // Save updated document
        message = "Course successfully added to your enrollment.";
        status = 200;
      } else {
        return res.status(200).json({
          message: "You are already enrolled in this course.",
          emailSent: false,
        });
      }
    } else {
      // Create a new student if not already enrolled
      await StudentModel.create({
        fullName,
        email,
        phone,
        city,
        country,
        subjects: [courseId], // Add course as an array
      });
      message = "You are successfully enrolled.";
      status = 201;
    }

    const emailSent = await sendEnrollmentEmail(fullName, email, course_title);
    return res.status(status).json({ message, emailSent });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ error: "Failed to enroll. Please try again later." });
  }
});

router.get("/total-students", async (req, res) => {
  try {
    const total = await StudentModel.find({});
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch students." });
  }
});

router.get("/status/:id", checkForAuthentication("token"), async (req, res) => {
  try {
    const courseId = req.params.id;
    const user = req.user;

    const student = await StudentModel.findOne({ email: user.email });
    if (!student) {
      return res.status(200).json({ enrolled: false });
    }

    const enrolled = student.subjects.some(
      (subject) => subject.toString() === courseId
    );

    return res.status(200).json({ enrolled });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to check enrollment." });
  }
});

router.get("/total/:id", async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    // Fetch all students and populate the subjects
    const students = await StudentModel.find({}).populate("subjects");
    // Filter the students based on the course ID in their subjects
    const totalStudents = students.filter((student) => {
      return student.subjects.some((subject) => subject._id.equals(courseId)); // Use .equals for ObjectId comparison
    });

    return res.status(200).json({ totalStudents: totalStudents.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "failed to fetch error" });
  }
});

module.exports = router;
