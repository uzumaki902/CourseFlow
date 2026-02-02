import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Buy = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const handlePurchase = async () => {
    if (!token) {
      toast.error("please login to purchase the course");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/v1/course/buy/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );
      toast.success(response.data.message || "Course purchased successfully");
      navigate("/purchases");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        toast.error(error.response.data.errors || "Error in purchasing course");
      } else {
        toast.error(
          error?.response?.data?.errors ||
            "Something went wrong. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <Button className="cursor-pointer hover:bg-purple-600" onClick={handlePurchase}>
        {loading ? "Loading..." : "Buy Course"}
      </Button>
    </div>
  );
};

export default Buy;
