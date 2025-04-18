import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeInfoProvider } from "./context/HomeInfoContext";
import Home from "./pages/Home/Home";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import AnimeInfo from "./pages/animeInfo/AnimeInfo";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Error from "./components/error/Error";
import Category from "./pages/category/Category";
import AtoZ from "./pages/a2z/AtoZ";
import { azRoute, categoryRoutes } from "./utils/category.utils";
import Search from "./pages/search/Search";
import Watch from "./pages/watch/Watch";
import Producer from "./components/producer/Producer";


function App() {
  const location = useLocation();

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <HomeInfoProvider>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/:id" element={<AnimeInfo />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/random" element={<AnimeInfo random={true} />} />
        <Route path="/404-not-found-page" element={<Error error="404" />} />
        <Route path="/error-page" element={<Error />} />
        {/* Render category routes */}
        {categoryRoutes.map((path) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <Category path={path} label={path.split("-").join(" ")} />
            }
          />
        ))}
        {/* Render A to Z routes */}
        {azRoute.map((path) => (
          <Route
            key={path}
            path={`/${path}`}
            element={<AtoZ path={path} />}
          />
        ))}
        <Route path="/producer/:id" element={<Producer />} />
        <Route path="/search" element={<Search />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Error error="404" />} />
      </Routes>
    </HomeInfoProvider>
  );
}

export default App;
