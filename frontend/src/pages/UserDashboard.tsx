import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-8xl font-bold mb-6 text-gray-800 p-5"
        >
          Welcome
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Live Quizzes Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/user/livequizes")}
          >
            <div className="text-xl font-semibold text-blue-600">
              Get Live Quizzes
            </div>
          </motion.div>

          {/* Previous Results Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/user/result")}
          >
            <div className="text-xl font-semibold text-green-600">
              Get Previous Results
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
