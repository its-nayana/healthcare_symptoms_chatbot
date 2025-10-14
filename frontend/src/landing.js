import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1698421947098-d68176a8f5b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1952"
          alt="Healthy Lifestyle"
        />
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Your Health, Your Wealth</h1>
        <p className="landing-quote">
          “Take care of your body — it's the only place you have to live.”
        </p>
        <button
          className="get-started-btn"
          onClick={() => navigate("/chat")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;
