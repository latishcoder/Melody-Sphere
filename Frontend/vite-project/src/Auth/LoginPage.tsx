import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1677583195344-e4f2f5e9f932?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-xl w-96 border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login to MelodySphere</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded bg-transparent text-white border-white/50 placeholder-white/50"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded bg-transparent text-white border-white/50 placeholder-white/50"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded hover:opacity-80 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
