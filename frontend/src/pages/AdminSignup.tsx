import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import axios from "axios";


export const AdminSignup = () => {
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [position, setposition] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://quiz-backend.vrushabhpatil4801.workers.dev/api/admin/signup', {
                name: name,
                username: username,
                position: position,
                password: password
            })
            if(response.data.jwt){
                localStorage.setItem("token", response.data.jwt);
                alert('Signup Successful!')
                navigate("/admin/dashboard")
            }
            else{
                alert('No token received');
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorMessage = error.response?.data?.error || "Signup failed. Please try again.";
                alert(errorMessage);
            }
        }
    };
    
    return(
        <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#dafdfd] from-cyan-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account as Admin
        </h2>

        <form>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Position
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your Position"
              onChange={(e) => setposition(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <button onClick={() => navigate('/admin/signin')} className="text-blue-500 hover:underline">Signin</button>
          </p>
        </form>
      </div>
    </div>
    </>
    )
}