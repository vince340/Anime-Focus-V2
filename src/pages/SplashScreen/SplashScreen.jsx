import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/src/styles/SplashScreen.css";
import logoTitle from "@/src/config/logoTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import getTopSearch from "@/src/utils/getTopSearch.utils";
import SocialLinks from "@/src/components/social/SocialLinks";

const NAV_LINKS = [
  { to: "/home", label: "Home" },
  { to: "/movie", label: "Movies" },
  { to: "/tv", label: "TV Series" },
  { to: "/most-popular", label: "Most Popular" },
  { to: "/top-airing", label: "Top Airing" },
];

const useTopSearch = () => {
  const [topSearch, setTopSearch] = useState([]);
  useEffect(() => {
    const fetchTopSearch = async () => {
      const data = await getTopSearch();
      if (data) setTopSearch(data);
    };
    fetchTopSearch();
  }, []);
  return topSearch;
};

function SplashScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topSearch = useTopSearch();

  const handleSearchSubmit = useCallback(() => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    const queryParam = encodeURIComponent(trimmedSearch);
    navigate(`/search?keyword=${queryParam}`);
  }, [search, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <nav className="relative w-full mb-12">
          <div className="hidden md:flex justify-center space-x-12 font-semibold">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="text-white hover:text-[#ffbade] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="text-white hover:text-[#ffbade] transition-colors flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Menu</span>
            </button>
          </div>

          {isModalOpen && (
            <div className="absolute top-12 left-0 right-0 bg-[#2B2A3C] rounded-lg p-4 shadow-lg md:hidden z-50">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-2 text-white hover:text-[#ffbade] transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="splashscreen rounded-3xl bg-[#2B2A3C] overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
              <Link to="/home" className="text-4xl md:text-5xl font-extrabold tracking-wide mb-8">
                {logoTitle.slice(0, 3)}
                <span className="text-[#FFBADE]">{logoTitle.slice(3, 4)}</span>
                {logoTitle.slice(4)}
              </Link>

              <div className="flex gap-3 mb-8">
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="flex-1 py-3 px-6 rounded-xl bg-white text-black text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="bg-[#FFBADE] text-black py-3 px-6 rounded-xl hover:bg-[#ff9ec8] transition-colors"
                  onClick={handleSearchSubmit}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                </button>
              </div>

              <div className="mb-8">
                <span className="text-white font-semibold">Top search: </span>
                {topSearch.map((item, index) => (
                  <span key={index} className="text-gray-300">
                    <Link to={item.link} className="hover:text-[#ffbade] transition-colors">{item.title}</Link>
                    {index < topSearch.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <Link to="/home" className="inline-block">
                <button className="bg-[#FFBADE] text-black py-4 px-8 rounded-xl font-bold text-xl hover:bg-[#ff9ec8] transition-colors flex items-center space-x-4">
                  <span>Watch anime</span>
                  <FontAwesomeIcon icon={faCircleArrowRight} />
                </button>
              </Link>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="splashoverlay"></div>
              <img
                src="https://i.imgur.com/GNbVFV9.gif"
                alt="Splash"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <section className="social-section mt-16 rounded-3xl overflow-hidden">
          <div className="share-container">
            <div className="share-content">
              <div className="share-text">
                <span>Share {logoTitle}</span>
                <p>with your friends</p>
              </div>
              <SocialLinks />
            </div>
          </div>

          <div className="description-footer">
            <p className="description-text">
              🌟 Experience the ultimate anime streaming platform with {logoTitle}! Join our passionate community of anime enthusiasts and unlock a world of endless entertainment. Whether you're a seasoned otaku or just starting your anime journey, we've got something special for you! 🎮
            </p>
            <div className="features-grid">
              <div className="feature-item">
                <span>🎥 HD Streaming</span>
                <p>Watch your favorite anime in stunning 1080p quality with no buffering!</p>
              </div>
              <div className="feature-item">
                <span>🚀 Lightning Fast Updates</span>
                <p>Get the latest episodes just hours after Japan release!</p>
              </div>
              <div className="feature-item">
                <span>📱 Multi-Device Support</span>
                <p>Watch seamlessly on your phone, tablet, or computer - anytime, anywhere!</p>
              </div>
              <div className="feature-item">
                <span>🌏 Global Community</span>
                <p>Join millions of anime fans worldwide in our vibrant community!</p>
              </div>
              <div className="feature-item">
                <span>🎯 Zero Ads</span>
                <p>Enjoy uninterrupted streaming with absolutely no advertisements!</p>
              </div>
              <div className="feature-item">
                <span>💫 Extensive Library</span>
                <p>Access thousands of anime titles from classics to latest releases!</p>
              </div>
              <div className="feature-item">
                <span>🎮 Interactive Community</span>
                <p>Rate, review, and discuss your favorite shows with fellow fans!</p>
              </div>
              <div className="feature-item">
                <span>🎯 Smart Recommendations</span>
                <p>Get personalized anime suggestions based on your watching history!</p>
              </div>
            </div>
          </div>

          <div className="copyright">
            © {new Date().getFullYear()} {logoTitle} All rights reserved.
          </div>
        </section>
      </div>
    </div>
  );
}

export default SplashScreen;
