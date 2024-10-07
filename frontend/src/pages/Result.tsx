import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Result = () => {
  const { quizid } = useParams();
  const [result, setResult] = useState<any>(null);
  const [previousScores, setPreviousScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false); // Loading state for leaderboard

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token Found");
        setLoading(false);
        return;
      }

      try {
        const resultResponse = await axios.get(
          `https://quiz-backend.vrushabhpatil4801.workers.dev/api/user/results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userResults = resultResponse.data.results;
        const currentQuizResult = userResults.find(
          (res: any) => res.quiz.id === quizid
        );

        setResult(currentQuizResult || null);
        setPreviousScores(userResults);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizid]);

  const fetchLeaderboard = async (quizId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token Found");
      return;
    }

    setLoadingLeaderboard(true); // Start loading state for leaderboard

    try {
      const leaderboardResponse = await axios.get(
        `https://quiz-backend.vrushabhpatil4801.workers.dev/api/user/quiz/leaderboard/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeaderboard(leaderboardResponse.data.leaderboard);
      setShowLeaderboard(true);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoadingLeaderboard(false); // End loading state for leaderboard
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ddf9ff] p-6">
      {loading ? (
        <p className="text-lg font-semibold text-gray-800">Loading results...</p>
      ) : (
        <>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">Quiz Results</h1>
          {result ? (
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 mb-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Your Score: {result.score}</h2>
              <p className="text-gray-600">Correct Answers: {result.correctAnswers}</p>
              <p className="text-gray-600">Total Questions: {result.totalQuestions}</p>
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => fetchLeaderboard(result.quiz.id)}
              >
                Show Leaderboard
              </button>
            </div>
          ) : (
            <p className="text-lg font-semibold text-red-500"></p>
          )}

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Previous Quiz Scores</h2>
          <ul className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8">
            {previousScores.length > 0 ? (
              previousScores.map((score) => (
                <li key={score.quiz.id} className="mb-4 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Quiz: {score.quiz.title}</span>
                  <span className="font-semibold text-blue-600">{score.score}</span>
                  <button
                    className="ml-4 text-blue-600 underline hover:text-blue-400 transition duration-200"
                    onClick={() => fetchLeaderboard(score.quiz.id)}
                  >
                    Show Leaderboard
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No previous scores available.</p>
            )}
          </ul>

          {showLeaderboard && (
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">Leaderboard</h2>
              {loadingLeaderboard ? ( // Show skeleton loader while fetching leaderboard
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
        </>
      )}
    </div>
    </>
  );
};
