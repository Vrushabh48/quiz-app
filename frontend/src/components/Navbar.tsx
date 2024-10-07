import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate(); // Correct spelling here

    return (
        <div className="grid grid-cols-2 p-6 border-b-2">
            {/* Brand Name */}
            <div className="pl-4">
                <h1 className="text-3xl font-serif">Quizly</h1>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-3 pt-3 text-1xl">
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
            </div>
        </div>
    );
};
