import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token to log the user out
    navigate("/"); // Redirect to login page after logout
  };

  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

  return (
    <div className="flex justify-between items-center p-6 border-b-2">
      {/* Brand Name */}
      <div className="pl-4">
        <h1 className="text-3xl font-serif">Quizly</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 pt-3">
        <button
          className="lg:text-lg text-sm font-mono hover:text-blue-400"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="lg:text-lg text-sm font-mono hover:text-blue-400"
          onClick={() => navigate('/aboutus')}
        >
          About Us
        </button>
        <button
          className="lg:text-lg text-sm font-mono hover:text-blue-400"
          onClick={() => navigate('/admin/signup')}
        >
          For Admin
        </button>

        {/* Display Logout Button if the user is logged in */}
        {isLoggedIn && (
          <button
            className="lg:text-lg text-sm font-mono hover:text-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
