import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleContinue = () => {
    setIsVisible(false);
    navigate('/home');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src="/welcome-avatar.png" alt="Welcome Avatar" className="welcome-avatar" />
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
          <span>Top search:</span>
          <span>Dandadan,</span>
          <span>One Piece,</span>
          <span>Solo Leveling</span>
        </div>
        <div className="splash-buttons">
          <button onClick={() => navigate('/watch')}>Watch Anime</button>
          <button onClick={handleContinue} className="continue-btn">Continue to Site</button>
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
}
