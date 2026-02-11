import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

import { 
  ArrowLeft, 
  BookPlus, 
  FileImage, 
  DollarSign, 
  Type, 
  FileText,
  Upload,
  Loader,
  Image
} from "lucide-react";
import { motion } from "framer-motion";

function CourseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully");
      navigate("/admin/our-courses");
      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-purple-600/20 rounded-xl">
              <BookPlus className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create New Course
              </h1>
              <p className="text-gray-400 mt-1">
                Fill in the details to add a new course to the platform
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleCreateCourse} className="space-y-8">
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <Type className="w-5 h-5 text-purple-400" />
                Course Title
              </label>
              <input
                type="text"
                placeholder="e.g., Complete React Masterclass"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <FileText className="w-5 h-5 text-purple-400" />
                Course Description
              </label>
              <textarea
                placeholder="Describe what students will learn in this course..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-5 py-4 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              />
            </motion.div>

            {/* Price Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <DollarSign className="w-5 h-5 text-purple-400" />
                Course Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  placeholder="99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-12 pr-5 py-4 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Image Upload Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <FileImage className="w-5 h-5 text-purple-400" />
                Course Image
              </label>

              {/* Image Preview */}
              <div className="relative group">
                <div className="w-full h-64 bg-white/5 border-2 border-dashed border-purple-800/50 rounded-xl overflow-hidden flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No image selected</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Recommended: 1280x720px
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Button Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <div className="text-center text-white">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Click to upload new image</p>
                  </div>
                </div>
              </div>

              {/* File Input */}
              <input
                type="file"
                onChange={changePhotoHandler}
                accept="image/*"
                className="w-full px-5 py-4 bg-white/10 border border-purple-800/50 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 file:cursor-pointer cursor-pointer transition-all"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 pt-6"
            >
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 px-6 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  <>
                    <BookPlus className="w-5 h-5" />
                    Create Course
                  </>
                )}
              </button>

              <Link
                to="/admin/dashboard"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center"
              >
                Cancel
              </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Helper Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-purple-600/10 border border-purple-600/30 rounded-xl"
        >
          <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
            💡 Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Use a clear, descriptive title that includes key technologies</li>
            <li>• Write a compelling description highlighting what students will learn</li>
            <li>• Set a competitive price based on course length and content depth</li>
            <li>• Upload a high-quality thumbnail image (1280x720px recommended)</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default CourseCreate;