import { Navbar } from "../components/Navbar";

export const AboutUs = () => {
    return (
        <>
        <Navbar />
      <div className="bg-[#ddf9ff] from-blue-100 via-cyan-100 to-blue-50 py-12 px-6 md:px-16 lg:px-24">
        {/* Header Section */}
        <section className="text-center py-12">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-poppins">
            About Quizly
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Quizly, we believe in making learning fun and engaging. Our mission
            is to provide a platform where users can create, play, and share quizzes
            to expand their knowledge and challenge themselves or others in a friendly
            and interactive way.
          </p>
        </section>
  
        {/* Vision and Mission Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/premium-vector/online-education-courses-concept_701961-254.jpg"
                alt="Quizly Vision"
                className="rounded-lg shadow-lg w-3/4"
              />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                We envision a world where education and entertainment blend
                seamlessly, where learning doesn't feel like a chore but an
                adventure. With Quizly, we aim to revolutionize the way people
                perceive quizzes — not just as a testing tool, but as an enjoyable
                and rewarding experience.
              </p>
            </div>
          </div>
        </section>
  
        {/* Mission Statement */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                Our mission is to empower learners, educators, and trivia
                enthusiasts by providing a platform that offers a vast library of
                quizzes, customization options, and engaging gameplay. Whether
                you're looking to study for exams, test your knowledge, or have fun
                with friends, Quizly is the go-to destination.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/premium-vector/online-course-tutorial-webinar-concept_701961-227.jpg"
                alt="Quizly Mission"
                className="rounded-lg shadow-lg w-3/4"
              />
            </div>
          </div>
        </section>
      </div>
      </>
    );
  };
  