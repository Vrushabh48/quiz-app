import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Landingpage = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#ddf9ff] p-6 lg:p-12">
        <div className="p-5 text-center lg:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold p-3 font-poppins">
              Welcome to Quizly!
            </h1>
            <p className="p-3 font-poppins font-normal text-xl lg:text-2xl">
              Engage, Learn, and Have Fun!
            </p>
          </div>
          <p className="font-poppins p-3 tracking-wider text-lg lg:text-xl">
            {" "}
            Quizly is your ultimate destination for interactive quizzes. Whether
            you're a student, teacher, or just someone who loves trivia, Quizly
            offers a fun and educational experience for everyone.
          </p>

          <div className="p-5 flex justify-center lg:justify-start">
            <button onClick={()=> navigate('/signup')} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Get Started with Us
              </span>
            </button>
          </div>
        </div>
        <div className="p-5">
          <img
            className="rounded-lg"
            src="https://img.freepik.com/premium-vector/student-taking-online-exam-home-pandemic-elearning-education-concept_530733-1534.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 p-7">
        <div className="text-center">
          <h1 className="p-3 text-4xl font-extrabold">Features</h1>
        </div>
        <div className="p-6 rounded-lg shadow-lg">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-poppins p-4">
            <li className="mb-4 p-6 text-xl lg:text-2xl border-x-4">
              <strong className="text-blue-600">Interactive Learning:</strong>{" "}
              Test your knowledge with quizzes that cover various subjects and
              difficulty levels.
            </li>
            <li className="mb-4 p-6 text-xl lg:text-2xl border-x-4">
              <strong className="text-green-600">Compete with Friends:</strong>{" "}
              Challenge your friends or join public quizzes to see who knows
              more.
            </li>
            <li className="mb-4 p-6 text-xl lg:text-2xl border-x-4">
              <strong className="text-purple-600">Track Your Progress:</strong>{" "}
              Keep track of your scores and improve your knowledge with each
              quiz.
            </li>
            <li className="mb-4 p-6 text-xl lg:text-2xl border-x-4">
              <strong className="text-indigo-600">Create and Play Quizzes:</strong>{" "}
              Easily create your own quizzes or choose from a library of quizzes
              created by others.
            </li>
          </ul>
        </div>
      </div>

      {/* Why Quizly section responsive grid */}
      <div className="bg-[#ddf9ff] p-7">
        <div className="text-center">
          <h1 className="p-3 text-4xl font-extrabold">Why Quizly?</h1>
        </div>
        <div className="p-6 rounded-lg shadow-lg">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-poppins p-4">
            <li className="mb-4 p-6 text-xl lg:text-2xl">
              <strong className="text-blue-600">User-Friendly Interface:</strong>{" "}
              Simple and intuitive design for seamless navigation.
            </li>
            <li className="mb-4 p-6 text-xl lg:text-2xl">
              <strong className="text-green-600">Educational Value:</strong>{" "}
              Learn new facts and expand your knowledge in a fun way.
            </li>
          </ul>
        </div>
      </div>

      {/* Call-to-action section */}
      <section className="text-center py-16 from-blue-500 to-cyan-500 rounded-lg shadow-lg mt-12">
          <h2 className="text-4xl font-extrabold text-black mb-6">
            Ready to Start Your Quiz Journey?
          </h2>
          <button onClick={() => navigate('/user/signup')} className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-gray-100 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-black dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Signup
            </span>
          </button>
          <button onClick={()=> navigate('/user/signin')} className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-gray-100 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-black dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Signin
            </span>
          </button>
        </section>
    </div>
  );
};