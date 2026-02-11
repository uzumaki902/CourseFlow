import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const navigate = useNavigate();

  // ================= STATE =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LOGIN HANDLER =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ SAVE USER DATA + TOKEN
      localStorage.setItem(
        "admin",
        JSON.stringify({
          token: response.data.token,
          id: response.data.user._id,
          email: response.data.user.email,
        })
      );

      toast.success("Login successful");
      navigate("/admin/dashboard"); // go to admin dashboard
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-8 rounded-xl border border-purple-800/40 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-800/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-800/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center text-gray-400">
          Dont have an account? <Link to="/signup" className="text-purple-400">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
