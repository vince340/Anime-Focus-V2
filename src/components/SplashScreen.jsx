import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);

  const trendingAnime = [
    "Dandadan",
    "One Piece",
    "Solo Leveling",
    "Jujutsu Kaisen",
    "Demon Slayer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % trendingAnime.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/home"), 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={`splash-screen ${!isVisible ? "fade-out" : ""}`}>
      <div className="splash-content">
        <img
          src="https://i.imgur.com/GNbVFV9.gif"
          alt="Welcome Avatar"
          className="welcome-avatar"
        />

        <h1>Welcome to AnimeFocus</h1>

        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="trending-keywords">
          <span>Trending:</span>
          <span className="trending-anime fade-in">
            {trendingAnime[currentTrendingIndex]}
          </span>
        </div>

        <div className="splash-buttons">
          <button onClick={() => navigate("/home")}>Watch Anime</button>
          <button onClick={handleContinue} className="continue-btn">
            Continue to Site
          </button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
