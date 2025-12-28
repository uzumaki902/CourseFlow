import { Course } from "../models/course.model.js";
export const createCourse = async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const courseData = {
      title,
      description,
      price,
      image,
    };
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "error creating the course" });
  }
};
