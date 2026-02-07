import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const { image } = req.files;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "no file is uploaded" });
    }
    const allowedFormat = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "only jpg, jpeg and png formats are allowed" });
    }
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(500)
        .json({ errors: "image upload failed in cloudinary" });
    }
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
       
      },
       creatorId: adminId,
    };
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: "error creating the course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;
  try {
    const courseSearch = await Course.findById(courseId);
    if (!courseSearch) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const course = await Course.updateOne(
      { _id: courseId, creatorId: adminId },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      },
    );
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: "error updating the course", error: error.message });
  }
};
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "error deleting the course", error: error.message });
    console.log("error in course deletion", error);
  }
};
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(201).json({ courses });
  } catch (error) {
    console.log("error in fetching courses", error);
    res
      .status(500)
      .json({ errors: "error in fetching courses", error: error.message });
  }
};
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.log("error in fetching course details", error);
    res.status(500).json({
      errors: "error in fetching course details",
      error: error.message,
    });
  }
};
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "course not found" });
    }
    const existingPurachase = await Purchase.findOne({ userId, courseId });
    if (existingPurachase) {
      return res.status(400).json({ errors: "course already purchased" });
    }
    const newPurchase = new Purchase({ userId, courseId });
    await newPurchase.save();
    res
      .status(201)
      .json({ message: "course purchased successfully", newPurchase });
  } catch (error) {
    req
      .status(500)
      .json({ errors: "error in buying course", error: error.message });
  }
};