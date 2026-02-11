import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import { CreditCard, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Buy = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/course/courses`
        );
        const foundCourse = response.data.courses.find(
          (c) => c._id === courseId
        );
        setCourse(foundCourse);
      } catch (error) {
        toast.error("Failed to load course");
        navigate("/courses");
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      value = value.slice(0, 19); // 16 digits + 3 spaces
    }

    // Restrict to numbers only for certain fields
    if (["cardNumber", "cvv", "pin", "expiryMonth", "expiryYear"].includes(name)) {
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
        "http://localhost:3000/api/v1/payment/process",
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
      const errorMsg =
        error.response?.data?.errors ||
        error.response?.data?.errors?.[0]?.message ||
        "Payment failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading course...</p>
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
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
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
              <img
                src={course.image?.url || "https://via.placeholder.com/600x300"}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-gray-400">{course.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                  <span className="text-4xl font-bold bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    ${course.price}
                  </span>
                  <div className="flex items-center gap-2 text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>

            {!showPaymentForm && (
              <Button
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Proceed to Payment
              </Button>
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
                <div>
                  <Label className="text-gray-300">Card Number</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Avoid cards ending with 0000 (they're flagged as invalid)
                  </p>
                </div>

                {/* Card Holder */}
                <div>
                  <Label className="text-gray-300">Card Holder Name</Label>
                  <Input
                    type="text"
                    name="cardHolder"
                    placeholder="JOHN DOE"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-300">Month</Label>
                    <Input
                      type="text"
                      name="expiryMonth"
                      placeholder="MM"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Year</Label>
                    <Input
                      type="text"
                      name="expiryYear"
                      placeholder="YY"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">CVV</Label>
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* PIN */}
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Card PIN
                  </Label>
                  <Input
                    type="password"
                    name="pin"
                    placeholder="****"
                    value={formData.pin}
                    onChange={handleInputChange}
                    required
                    maxLength={4}
                    className="bg-white/10 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay $${course.price}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  🔒 Your payment is secured with 256-bit encryption
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;