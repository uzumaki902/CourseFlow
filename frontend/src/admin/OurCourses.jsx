import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Edit,
  Trash2,
  Search,
  Plus,
  DollarSign,
  X,
  Save,
  Loader,
  AlertCircle,
  User,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_URL } from "../utils/utils";

const OurCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [updating, setUpdating] = useState(false);

  // Get admin info
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const token = admin?.token;
  const adminId = admin?.admin?._id;

  // Check if admin is logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please login as admin");
      navigate("/admin/login");
    } else {
      fetchCourses();
    }
  }, [token, navigate]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/course/courses`,
        { withCredentials: true }
      );
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Check if current admin owns the course
  const isOwner = (course) => {
    return course.creatorId === adminId || course.creatorId?._id === adminId;
  };

  // Handle Delete
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    try {
      setDeleting(true);
      await axios.delete(
        `${BACKEND_URL}/course/delete/${courseToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Course deleted successfully!");
      fetchCourses(); // Refresh the list
      setDeleteModalOpen(false);
      setCourseToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.errors || "Failed to delete course");
    } finally {
      setDeleting(false);
    }
  };

  // Handle Edit
  const handleEditClick = (course) => {
    setCourseToEdit(course);
    setEditFormData({
      title: course.title || "",
      description: course.description || "",
      price: course.price || "",
    });
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!courseToEdit) return;

    // Validation
    if (!editFormData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!editFormData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!editFormData.price || editFormData.price <= 0) {
      toast.error("Valid price is required");
      return;
    }

    try {
      setUpdating(true);
      await axios.put(
        `${BACKEND_URL}/course/update/${courseToEdit._id}`,
        {
          title: editFormData.title.trim(),
          description: editFormData.description.trim(),
          price: Number(editFormData.price),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Course updated successfully!");
      fetchCourses(); // Refresh the list
      setEditModalOpen(false);
      setCourseToEdit(null);
    } catch (error) {
      toast.error(error.response?.data?.errors || "Failed to update course");
    } finally {
      setUpdating(false);
    }
  };

  // Filter courses based on search
  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-light mb-2">
                All{" "}
                <span className="font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              <p className="text-gray-400">
                View and manage all courses • You can only edit/delete your own courses
              </p>
            </div>

            <Link
              to="/admin/create-course"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </Link>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-6 mb-8"
        >
          <div className="px-6 py-3 bg-white/5 border border-gray-800 rounded-xl">
            <span className="text-gray-400">Total Courses: </span>
            <span className="font-bold text-white">{courses.length}</span>
          </div>
          <div className="px-6 py-3 bg-purple-600/20 border border-purple-600/50 rounded-xl">
            <span className="text-purple-300">Your Courses: </span>
            <span className="font-bold text-white">
              {courses.filter((c) => isOwner(c)).length}
            </span>
          </div>
        </motion.div>

        {/* Courses List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">Loading courses...</p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12">
                <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-light text-gray-300 mb-3">
                  {searchTerm ? "No courses found" : "No courses yet"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? "Try a different search term"
                    : "Start by creating your first course"}
                </p>
                {!searchTerm && (
                  <Link
                    to="/admin/create-course"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl transition"
                  >
                    <Plus className="w-5 h-5" />
                    Create First Course
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all group ${
                  isOwner(course)
                    ? "border-purple-600/50 hover:border-purple-400"
                    : "border-gray-800 hover:border-gray-700"
                }`}
              >
                {/* Owner Badge */}
                {isOwner(course) && (
                  <div className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 text-center">
                    Your Course
                  </div>
                )}

                {/* Course Image */}
                <div className="h-48 relative">
                  {course.image?.url ? (
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-green-600 px-3 py-1 rounded-full flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold">{course.price}</span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-800">
                    {isOwner(course) ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(course)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl text-blue-400 transition font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl text-red-400 transition font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 py-3 text-gray-500 text-sm justify-center">
                        <User className="w-4 h-4" />
                        <span>Created by another admin</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && courseToDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/20 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Delete Course?</h3>
                  <p className="text-gray-400 text-sm">This cannot be undone</p>
                </div>
              </div>

              <div className="bg-white/5 border border-gray-800 rounded-xl p-4 mb-6">
                <p className="text-gray-300">
                  You are about to delete:{" "}
                  <span className="font-semibold text-white">
                    "{courseToDelete.title}"
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete Course
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setCourseToDelete(null);
                  }}
                  disabled={deleting}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Course Modal */}
      <AnimatePresence>
        {editModalOpen && courseToEdit && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-full">
                    <Edit className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Edit Course</h3>
                    <p className="text-gray-400 text-sm">
                      Update course details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditModalOpen(false);
                    setCourseToEdit(null);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    required
                    placeholder="Enter course title"
                    className="w-full bg-white/10 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    required
                    rows={4}
                    placeholder="Enter course description"
                    className="w-full bg-white/10 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition resize-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditFormChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full bg-white/10 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                    />
                  </div>
                </div>

                {/* Current Image Preview */}
                {courseToEdit.image?.url && (
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Current Image
                    </label>
                    <div className="bg-white/5 border border-gray-700 rounded-xl p-3">
                      <img
                        src={courseToEdit.image.url}
                        alt={courseToEdit.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Image cannot be changed here
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditModalOpen(false);
                      setCourseToEdit(null);
                    }}
                    disabled={updating}
                    className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurCourses;