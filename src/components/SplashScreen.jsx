import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/SplashScreen.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);

  const trendingAnime = [
    'Dandadan', 'One Piece', 'Solo Leveling', 'Jujutsu Kaisen', 'Demon Slayer'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % trendingAnime.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/home'), 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}
    >
      <div className="splash-content">
        <motion.img 
          src="https://i.imgur.com/GNbVFV9.gif" 
          alt="Welcome Avatar" 
          className="welcome-avatar"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to AnimeFocus
        </motion.h1>

        <motion.div 
          className="search-box"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          className="trending-keywords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Trending:</span>
          <motion.span
            key={currentTrendingIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="trending-anime"
          >
            {trendingAnime[currentTrendingIndex]}
          </motion.span>
        </motion.div>

        <motion.div 
          className="splash-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            onClick={() => navigate('/home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Anime
          </motion.button>
          <motion.button 
            onClick={handleContinue} 
            className="continue-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Site
          </motion.button>
          <motion.button 
            className="login-btn"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
