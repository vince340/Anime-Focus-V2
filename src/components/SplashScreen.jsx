
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

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
    <div className="splash-container">
      <nav className="top-nav">
        <a href="/home">Home</a>
        <a href="/movies">Movies</a>
        <a href="/tv-series">TV Series</a>
        <a href="/most-popular">Most Popular</a>
        <a href="/new-season">New Season</a>
      </nav>

      <div className="splash-content">
        <div className="logo">
          <h1>Ani<span>Focus</span></h1>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <div className="top-search">
          <span>Top search: </span>
          Dandadan, One Piece, Solo Leveling, Jujutsu Kaisen 2nd Season, Blue Lock,
          The Eminence in Shadow, Frieren: Beyond Journey's E..., Dragon Ball Daima
        </div>

        <div className="action-buttons">
          <button className="watch-btn" onClick={() => navigate("/home")}>
            Watch Anime
          </button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <section className="info-section">
          <h2>AnimeFocus - The best site to watch anime online for Free</h2>
          <p>
            Do you know that according to Google, the monthly search volume for anime related topics is up to over 1 billion times? Anime is famous worldwide and it is no wonder we've seen a sharp rise in the number of free anime streaming sites.
          </p>
          <p>
            Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we've decided to build AnimeFocus to be one of the best free anime streaming site for all anime fans on the world.
          </p>

          <div className="features">
            <h3>What is AnimeFocus?</h3>
            <p>
              AnimeFocus is a free site to watch anime and you can even download subbed or dubbed anime in ultra HD quality without any registration or payment. By having No Ads at all times, we are trying to make it the safest site for free anime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
