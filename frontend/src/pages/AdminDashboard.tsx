import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: string;
  title: string;
  createdAt: string;
  duration: number;
  endAt: string;
  status: boolean;
}

interface LeaderboardEntry {
  user: {
    id: string;
    username: string;
  };
  score: number;
}

export const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [deletingQuizId, setDeletingQuizId] = useState<string | null>(null);

  //useEffect hook to render quizes created by admin
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.get("https://quiz-backend.vrushabhpatil4801.workers.dev/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }
    setDeletingQuizId(quizId);
    try {
      await axios.put(
        `https://quiz-backend.vrushabhpatil4801.workers.dev/api/admin/quiz/end/${quizId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === quizId ? { ...quiz, status: false } : quiz
        )
      );
    } catch (error) {
      console.error("Error ending quiz:", error);
    } finally {
      setDeletingQuizId(null);
    }
  };

  const handleViewLeaderboard = async (quizId: string) => {
    const token = localStorage.getItem("token");
    setSelectedQuizId(quizId);
    console.log(selectedQuizId);
    setShowLeaderboard(true);
    setLoadingLeaderboard(true);
    try {
      const response = await axios.get(
        `https://quiz-backend.vrushabhpatil4801.workers.dev/api/admin/quiz/leaderboard/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/create");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
        >
          Add New Quiz
        </button>

        {loading ? (
          <p className="text-lg">Loading quizzes...</p>
        ) : quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {quizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                  {quiz.title}
                </h2>
                <p className="text-gray-700">Duration: {quiz.duration} mins</p>
                <p className="text-gray-500">
                  Created At: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500">
                  Ending At: {new Date(quiz.endAt).toLocaleString()}
                </p>

                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2 mr-2"
                  onClick={() => handleViewLeaderboard(quiz.id)}
                >
                  View Leaderboard
                </button>

                {deletingQuizId === quiz.id ? (
                  <button className="bg-gray-400 text-white px-3 py-1 rounded mt-2" disabled>
                    Ending Quiz...
                  </button>
                ) : !quiz.status ? (
                  <button className="bg-gray-500 text-white px-3 py-1 rounded mt-2" disabled>
                    Quiz Ended
                  </button>
                ) : (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    End Quiz
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No quizzes available</p>
        )}

        {/* Show Leaderboard if requested */}
        {showLeaderboard && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Leaderboard</h2>
            {loadingLeaderboard ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry) => (
                    <li key={entry.user.id} className="py-2 flex justify-between">
                      <span className="text-gray-700 font-medium">{entry.user.username}</span>
                      <span className="font-semibold text-blue-600">{entry.score}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No entries in the leaderboard.</p>
                )}
              </ul>
            )}
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-red-500 transition duration-200 transform hover:scale-105"
              onClick={() => setShowLeaderboard(false)}
            >
              Hide Leaderboard
            </button>
          </div>
        )}
      </div>
    </>
  );
};
