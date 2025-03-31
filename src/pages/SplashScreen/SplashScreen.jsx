
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img 
          src="/logo.png" 
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

        <div className="splash-buttons">
          <button onClick={() => navigate('/home')}>Get Started</button>
          <button onClick={() => navigate('/random')} className="continue-btn">Random Anime</button>
        </div>
      </div>
    </div>
  );
}
