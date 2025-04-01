import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SplashScreen.css";
import SocialLinks from "../../components/social/SocialLinks";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div id="wrapper" className="animated-bg">
      <div className="overlay-gradient">
        <header id="xheader">
          <nav className="container">
            <ul className="nav header_menu-list">
              <li className="nav-item"><a href="/home">Home</a></li>
              <li className="nav-item"><a href="/movie">Movie</a></li>
              <li className="nav-item"><a href="/random">Random</a></li>
              <li className="nav-item"><a href="/most-popular">Most Popular</a></li>
              <li className="nav-item"><a href="upcoming/">Up Coming</a></li>
            </ul>
          </nav>
        </header>

        <main id="xmain-wrapper">
          <section className="hero-section">
            <div className="container">
              <div className="content-wrapper">
                <div className="brand-section">
                  <div className="brand-content">
                    <div className="brand-stack">
                      <img src="/logo.png" alt="AnimeFocus" className="logo-image animate-float" />
                      <h1 className="brand-title">
                        <span className="title-anime">Anime</span>
                        <span className="title-focus">Focus</span>
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="search-section">
                  <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                      <input 
                        type="text" 
                        className="search-input"
                        placeholder="Search your favorite anime..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                      />
                      <button type="submit" className="search-button">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </form>

                  <div className="trending-searches">
                    <span className="trend-label">Popular searches:</span>
                    <div className="trend-tags">
                      <a href="/search?q=Dandadan">Dandadan</a>
                      <a href="/search?q=One+Piece">One Piece</a>
                      <a href="/search?q=Solo+Leveling">Solo Leveling</a>
                      <a href="/search?q=Jujutsu+Kaisen">Jujutsu Kaisen</a>
                      <a href="/search?q=Blue+Lock">Blue Lock</a>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    onClick={() => navigate('/home')} 
                    className="primary-button"
                  >
                    Watch Now <i className="fas fa-play-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="social-section">
            <div className="container">
              <div className="share-container">
                <div className="share-content">
                  <div className="share-text">
                    <span>Share AnimeFocus</span>
                    <p>with your friends</p>
                  </div>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
