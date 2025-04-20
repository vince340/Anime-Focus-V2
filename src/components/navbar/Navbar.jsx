import { useState, useEffect } from "react";
import logoTitle from "@/src/config/logoTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFilm,
  faRandom,
  faStar,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/src/context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { SearchProvider } from "@/src/context/SearchContext";
import WebSearch from "../searchbar/WebSearch";
import MobileSearch from "../searchbar/MobileSearch";
import Schedule from "../schedule/Schedule"; // Assuming Schedule component exists


function Navbar() {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const [isNotHomePage, setIsNotHomePage] = useState(location.pathname !== "/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleRandomClick = () => {
    if (location.pathname === "/random") {
      window.location.reload();
    }
  };
  useEffect(() => {
    setIsNotHomePage(location.pathname !== "/");
  }, [location.pathname]);

  return (
    <SearchProvider>
      <nav
        className={`fixed top-0 left-0 w-full h-16 z-[1000000] flex p-4 py-8 items-center justify-between transition-all duration-300 ease-in-out ${isNotHomePage ? "bg-[#242328]" : "bg-opacity-0"} ${isScrolled ? "bg-[#242328] bg-opacity-90 backdrop-blur-md" : ""} max-[600px]:h-fit max-[600px]:flex-col max-[1200px]:bg-opacity-100 max-[600px]:py-2`}
      >
        <div className="flex gap-x-6 items-center w-fit max-lg:w-full max-lg:justify-between">
          <div className="flex gap-x-6 items-center w-fit">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl text-white mt-1 cursor-pointer"
              onClick={handleHamburgerClick}
            />
            <img
              src="https://i.postimg.cc/FspVVZn7/logo.png"
              alt={logoTitle}
              className="w-[160px] h-[39px]"
            />
          </div>
          <WebSearch />
        </div>
        <div className="flex gap-x-7 items-center max-lg:hidden">
          {[
            { icon: faRandom, label: "Random", path: "/random" },
            { icon: faFilm, label: "Movie", path: "/movie" },
            { icon: faStar, label: "Popular", path: "/most-popular" },
          ].map((item) => (
            <Link
              key={item.path}
              to={
                item.path === "/random"
                  ? location.pathname === "/random"
                    ? "#"
                    : "/random"
                  : item.path
              }
              onClick={item.path === "/random" ? handleRandomClick : undefined}
              className="flex flex-col gap-y-1 items-center cursor-pointer"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-[#ff3d7f] text-xl font-bold"
              />
              <p className="text-[15px]">{item.label}</p>
            </Link>
          ))}
          <div className="flex flex-col gap-y-1 items-center w-auto">
            <div className="flex">
              {["EN", "JP"].map((lang, index) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-1 py-[1px] text-xs font-bold ${index === 0 ? "rounded-l-[3px]" : "rounded-r-[3px]"} ${language === lang ? "bg-[#ff3d7f] text-black" : "bg-gray-600 text-white"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="w-full">
              <p className="whitespace-nowrap text-[15px]">Anime name</p>
            </div>
          </div>
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="flex flex-col gap-y-1 items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faCalendar} className="text-[#ff3d7f] text-xl font-bold" />
            <p className="text-[15px]">Schedule</p>
          </button>
        </div>
        <MobileSearch />
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      {showSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
          <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-4xl mx-4 relative">
            <button
              onClick={() => setShowSchedule(false)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
            <Schedule />
          </div>
        </div>
      )}
    </SearchProvider>
  );
}

export default Navbar;