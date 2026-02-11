import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { CreditCard, Lock, ArrowLeft, ShieldCheck, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../utils/utils";

const Buy = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingCourse, setFetchingCourse] = useState(true);
  const [course, setCourse] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    pin: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.token;

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please login to purchase courses");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setFetchingCourse(true);
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        
        const foundCourse = response.data.courses?.find(
          (c) => c._id === courseId
        );
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          toast.error("Course not found");
          navigate("/courses");
        }
      } catch (error) {
        console.error("Failed to load course:", error);
        toast.error("Failed to load course");
        navigate("/courses");
      } finally {
        setFetchingCourse(false);
      }
    };
    
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "");
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{4})/g, "$1 ").trim();
      value = value.slice(0, 19); // 16 digits + 3 spaces
    }

    // Restrict to numbers only for certain fields
    if (["cvv", "pin", "expiryMonth", "expiryYear"].includes(name)) {
      value = value.replace(/\D/g, "");
    }

    // Limit lengths
    if (name === "cvv") value = value.slice(0, 3);
    if (name === "pin") value = value.slice(0, 4);
    if (name === "expiryMonth") value = value.slice(0, 2);
    if (name === "expiryYear") value = value.slice(0, 2);

    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }

    // Basic validation
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Card number must be 16 digits");
      return;
    }

    if (formData.cardHolder.trim().length < 3) {
      toast.error("Please enter a valid card holder name");
      return;
    }

    if (formData.cvv.length !== 3) {
      toast.error("CVV must be 3 digits");
      return;
    }

    if (formData.pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    try {
      setLoading(true);

      const paymentData = {
        courseId,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cardHolder: formData.cardHolder,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
        pin: formData.pin,
      };

      const response = await axios.post(
        `${BACKEND_URL}/payment/process`,
        paymentData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(
        `Payment successful! Transaction ID: ${response.data.transactionId}`
      );
      navigate("/purchases");
    } catch (error) {
      console.error("Payment error:", error);
      const errorMsg =
        error.response?.data?.errors ||
        error.response?.data?.errors?.[0]?.message ||
        "Payment failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching course
  if (fetchingCourse) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading course...</p>
        </div>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Course not found</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 text-purple-400 hover:text-purple-300"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          Back to Courses
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={course.image?.url || "https://via.placeholder.com/600x300?text=Course+Image"}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6 space-y-4">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-gray-400 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      ₹{course.price}
                    </span>
                    <span className="text-gray-500 line-through text-lg">₹{Math.round(course.price * 1.2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>

            {!showPaymentForm && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Proceed to Payment
              </motion.button>
            )}

            {/* Test Card Info */}
            {!showPaymentForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-xl"
              >
                <h3 className="text-blue-400 font-semibold mb-2 text-sm">💳 Test Card Details</h3>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Card: <span className="text-white font-mono">1111 2222 3333 4444</span></p>
                  <p>Expiry: <span className="text-white font-mono">12/28</span></p>
                  <p>CVV: <span className="text-white font-mono">123</span></p>
                  <p>PIN: <span className="text-white font-mono">1234</span></p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Payment Form */}
          {showPaymentForm && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Payment Details</h2>
                  <p className="text-sm text-gray-400">
                    Enter your card information
                  </p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-5">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Card Number</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12"
                  />
                  <p className="text-xs text-gray-500">
                    ⚠️ Cards ending with 0000 are invalid
                  </p>
                </div>

                {/* Card Holder */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Card Holder Name</Label>
                  <Input
                    type="text"
                    name="cardHolder"
                    placeholder="JOHN DOE"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12 uppercase"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Month</Label>
                    <Input
                      type="text"
                      name="expiryMonth"
                      placeholder="MM"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12 text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Year</Label>
                    <Input
                      type="text"
                      name="expiryYear"
                      placeholder="YY"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12 text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">CVV</Label>
                    <Input
                      type="password"
                      name="cvv"
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12 text-center"
                    />
                  </div>
                </div>

                {/* PIN */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Card PIN
                  </Label>
                  <Input
                    type="password"
                    name="pin"
                    placeholder="••••"
                    value={formData.pin}
                    onChange={handleInputChange}
                    required
                    maxLength={4}
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500 h-12"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ₹{course.price}
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <p className="text-xs text-gray-500">
                    Secured with 256-bit encryption
                  </p>
                </div>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="w-full py-3 text-gray-400 hover:text-white transition"
                >
                  ← Go Back
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;