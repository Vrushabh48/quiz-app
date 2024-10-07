import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

export const AttemptQuiz = () => {
  const [quizData, setQuizData] = useState<any | null>(null); 
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [savedOptions, setSavedOptions] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState<{ [key: string]: boolean }>({}); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const { quizid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token Found");
          return;
        }
        const response = await axios.post(
          `https://quiz-backend.vrushabhpatil4801.workers.dev/api/user/quiz/${quizid}`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if questions are received in the response
        if (response.data && response.data.questions) {
          console.log(response.data);
          setQuizData(response.data);
        } else {
          console.error("No questions found in the response");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [quizid]);

  const handleSelectOption = (questionId: string, optionLetter: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionLetter,
    }));
  };

  const handleSaveOption = async (questionId: string) => {
    setIsSaving((prev) => ({ ...prev, [questionId]: true }));
    try {
      setTimeout(() => {
        setSavedOptions((prev) => ({
          ...prev,
          [questionId]: selectedOptions[questionId],
        }));
        setIsSaving((prev) => ({ ...prev, [questionId]: false }));
      }, 500);
    } catch (error) {
      console.error("Error saving option:", error);
      setIsSaving((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token Found");
      setIsSubmitting(false);
      return;
    }

    const answers = Object.keys(savedOptions).reduce((acc, questionId) => {
      acc[questionId] = savedOptions[questionId];
      return acc;
    }, {} as { [key: string]: string });

    try {
      console.log(answers);
      const response = await axios.post(
        `https://quiz-backend.vrushabhpatil4801.workers.dev/api/user/submit/${quizid}`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quiz submitted successfully:", response.data);
      alert("Quiz submitted successfully!");
      navigate(`/user/result`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">Attempt Quiz</h1>

        <div className="w-full max-w-4xl bg-white p-4 md:p-8 rounded-lg shadow-lg">
          {quizData && quizData.questions ? (
            quizData.questions.map((question: any) => (
              <div key={question.id} className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{question.text}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {["A", "B", "C", "D"].map((optionLetter) => (
                    <button
                      key={optionLetter}
                      className={`border p-4 rounded-lg text-sm md:text-lg ${
                        selectedOptions[question.id] === optionLetter ? "bg-blue-200 border-blue-400" : "bg-gray-100"
                      }`}
                      onClick={() => handleSelectOption(question.id, optionLetter)}
                    >
                      {question[`option${optionLetter}`]}
                    </button>
                  ))}
                </div>

                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base"
                  onClick={() => handleSaveOption(question.id)}
                  disabled={isSaving[question.id]}
                >
                  {isSaving[question.id] ? "Saving..." : "Save"}
                </button>
              </div>
            ))
          ) : (
            <p>Loading quiz...</p>
          )}

          <button
            className="mt-8 bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base"
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </div>
    </>
  );
};
