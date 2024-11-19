import WorkerPage from "./pages/WorkerPage"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div>
        <div className="flex w-full fixed bg-black font-bold text-white p-5 text-3xl z-10 items-center">
          <div className="flex-1 ml-10 text-center">AJIVIKA SAFETY DASHBOARD</div>
          <ConditionalHomeButton />
        </div>
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/:workerId" element={<WorkerPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const ConditionalHomeButton = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();

  // Show the button only on the dashboard route
  if (!location.pathname.startsWith("/dashboard")) {
    return null;
  }

  const handleClick = () => {
    navigate(`/`); // Navigate to the homepage
  };

  return (
    <button
      onClick={handleClick}
      className="border text-sm border-gray-300 px-4 py-2 text-white bg-gray-800 rounded-md mr-6"
    >
      Home
    </button>
  );
};

export default App;
