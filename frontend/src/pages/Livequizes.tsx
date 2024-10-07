import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: string;
  title: string;
  createdAt: string;
  duration: number;
  endAt: string;
}

export const Livequizes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token Found");
          return;
        }
        const response = await axios.get("https://quiz-backend.vrushabhpatil4801.workers.dev/api/user/quizes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data.quizes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId: string) => {
    navigate(`/user/attemptquiz/${quizId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Live Quizzes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {loading ? ( // Check loading state
            // Skeleton Loader
            <>
              <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              {/* Add more skeleton loaders as needed */}
            </>
          ) : quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">{quiz.title}</h2>
                <p className="text-gray-700">Duration: {quiz.duration} mins</p>
                <p className="text-gray-500">Created At: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-500">Ending At: {new Date(quiz.endAt).toLocaleString()}</p>

                {/* Attempt Quiz Button */}
                <button
                  onClick={() => handleQuizClick(quiz.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Attempt Quiz
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No live quizzes available</p>
          )}
        </div>
      </div>
    </>
  );
};
