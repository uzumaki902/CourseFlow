import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  ArrowLeft,
  Edit,
  FileImage,
  DollarSign,
  Type,
  FileText,
  Upload,
  Loader,
  Image,
  Save,
  RefreshCw,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Original values for reset
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/course/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
        
        // Store original data for reset
        setOriginalData({
          title: data.course.title,
          description: data.course.description,
          price: data.course.price,
          imageUrl: data.course.image.url,
        });
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image && typeof image !== "string") {
      formData.append("imageUrl", image);
    }
    
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;
    
    if (!token) {
      toast.error("Please login to admin");
      navigate("/admin/login");
      return;
    }
    
    try {
      const response = await axios.put(
        `${BACKEND_URL}/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course updated successfully");
      navigate("/admin/our-courses");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.errors || "Failed to update course");
    } finally {
      setUpdating(false);
    }
  };

  const handleReset = () => {
    setTitle(originalData.title);
    setDescription(originalData.description);
    setPrice(originalData.price);
    setImagePreview(originalData.imageUrl);
    setImage(originalData.imageUrl);
    toast.success("Form reset to original values");
  };

  // Check if form has changes
  const hasChanges = () => {
    return (
      title !== originalData.title ||
      description !== originalData.description ||
      price !== originalData.price ||
      (typeof image !== "string" && image !== "")
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            to="/admin/our-courses"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            Back to Courses
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Edit className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Update Course
              </h1>
              <p className="text-gray-400 mt-1">
                Modify course details and save changes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-blue-800/40 rounded-2xl p-8 shadow-2xl"
        >
          {/* Unsaved Changes Warning */}
          {hasChanges() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/50 rounded-xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <p className="text-yellow-300 text-sm">
                You have unsaved changes
              </p>
            </motion.div>
          )}

          <form onSubmit={handleUpdateCourse} className="space-y-8">
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <Type className="w-5 h-5 text-blue-400" />
                Course Title
              </label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/10 border border-blue-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                <FileText className="w-5 h-5 text-blue-400" />
                Course Description
              </label>
              <textarea
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-5 py-4 bg-white/10 border border-blue-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
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
                <DollarSign className="w-5 h-5 text-blue-400" />
                Course Price
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  className="w-full pl-10 pr-5 py-4 bg-white/10 border border-blue-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                <FileImage className="w-5 h-5 text-blue-400" />
                Course Image
                <span className="text-xs text-gray-500 ml-2">
                  (Leave empty to keep current image)
                </span>
              </label>

              {/* Image Preview */}
              <div className="relative group">
                <div className="w-full h-64 bg-white/5 border-2 border-dashed border-blue-800/50 rounded-xl overflow-hidden flex items-center justify-center">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Course preview"
                        className="w-full h-full object-cover"
                      />
                      {/* New Image Badge */}
                      {typeof image !== "string" && image !== "" && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          New Image
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center">
                      <Image className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No image available</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Upload a course thumbnail
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Button Overlay */}
                {imagePreview && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <div className="text-center text-white">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Click below to change image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* File Input */}
              <input
                type="file"
                onChange={changePhotoHandler}
                accept="image/*"
                className="w-full px-5 py-4 bg-white/10 border border-blue-800/50 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer transition-all"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              {/* Save Button */}
              <button
                type="submit"
                disabled={updating}
                className="flex-1 min-w-[20rem] py-4 px-6 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating Course...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                disabled={updating || !hasChanges()}
                className="px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>

              {/* Cancel Button */}
              <Link
                to="/admin/our-courses"
                className="px-6 py-4 bg-red-900/20 hover:bg-red-900/30 border border-red-800/50 text-red-400 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-blue-600/10 border border-blue-600/30 rounded-xl"
        >
          <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            ℹ️ Update Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• All fields except image are required</li>
            <li>• Leave image field empty to keep the current image</li>
            <li>• Changes will be reflected immediately after saving</li>
            <li>• Use the reset button to restore original values</li>
          </ul>
        </motion.div>

        {/* Course ID Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-gray-600">
            Course ID: <span className="font-mono bg-white/5 px-2 py-1 rounded">{id}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default UpdateCourse;