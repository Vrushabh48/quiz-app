import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); //removing token
    navigate("/"); 
  };

  //checking is user is logged in or not
  const isLoggedIn = localStorage.getItem("token"); 

  return (
    <div className="flex justify-between items-center p-6 border-b-2">
      {/* Logo */}
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

        {/*Logout Button only if the user is logged in */}
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
