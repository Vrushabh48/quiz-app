import { useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define types for question and the request body
interface Question {
    text: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answerKey: string;
}

interface QuizData {
    title: string;
    duration: number;
    endAt: string;
    questions: Question[];
}

export const CreateQuiz = () => {
    const [title, setTitle] = useState<string>("");
    const [duration, setDuration] = useState<number | string>("");
    const [endAt, setEndAt] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([
        { text: "", optionA: "", optionB: "", optionC: "", optionD: "", answerKey: "" }
    ]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: QuizData = {
            title,
            duration: Number(duration),
            endAt,
            questions,
        };
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        try {
            const response = await axios.post("https://quiz-backend.vrushabhpatil4801.workers.dev/api/admin/create", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.message);
            alert("Quiz Created!")
            navigate('/admin/dashboard')
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: "", optionA: "", optionB: "", optionC: "", optionD: "", answerKey: "" }]);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Create a New Quiz</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Quiz Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                Quiz Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter quiz title"
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                            <label htmlFor="duration" className="block text-lg font-medium text-gray-700">
                                Duration (in minutes)
                            </label>
                            <input
                                id="duration"
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter quiz duration"
                                required
                            />
                        </div>

                        {/* End Time */}
                        <div className="space-y-2">
                            <label htmlFor="endAt" className="block text-lg font-medium text-gray-700">
                                End Time
                            </label>
                            <input
                                id="endAt"
                                type="datetime-local"
                                value={endAt}
                                onChange={(e) => setEndAt(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        {/* Dynamic Question Input */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Questions</h3>
                            {questions.map((question, index) => (
                                <div key={index} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-sm">
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">Question Text</label>
                                        <input
                                            type="text"
                                            value={question.text}
                                            onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Enter question text"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Option A</label>
                                            <input
                                                type="text"
                                                value={question.optionA}
                                                onChange={(e) => handleQuestionChange(index, "optionA", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Enter option A"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Option B</label>
                                            <input
                                                type="text"
                                                value={question.optionB}
                                                onChange={(e) => handleQuestionChange(index, "optionB", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Enter option B"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Option C</label>
                                            <input
                                                type="text"
                                                value={question.optionC}
                                                onChange={(e) => handleQuestionChange(index, "optionC", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Enter option C"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Option D</label>
                                            <input
                                                type="text"
                                                value={question.optionD}
                                                onChange={(e) => handleQuestionChange(index, "optionD", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Enter option D"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">Answer Key</label>
                                        <input
                                            type="text"
                                            value={question.answerKey}
                                            onChange={(e) => handleQuestionChange(index, "answerKey", e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Enter correct answer (A, B, C, or D)"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                            >
                                Add Another Question
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
                        >
                            Create Quiz
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
