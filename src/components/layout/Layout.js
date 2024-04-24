import "../../index.css";
import FollowUs from "./header/FollowUs";

import TopHeader from "./header/TopHeader";
import slider from "../../assests/slider-bg.jpg";
import { useEffect, useState } from "react";
import Slider from "./header/Slider";
import { useLocation } from "react-router-dom";
import SearchBox from "../searchBox/SearchBox";
import Footer from "./header/Footer";
const Layout = ({ children }) => {
  const [bg, setBg] = useState(slider);
  const [renderFooter, setRenderFooter] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    setRenderFooter(true);
    setTimeout(() => {
      setRenderFooter(false);
    }, 2000);
  }, [location.pathname]);
  const isTvOrMovieDetailPage = (path) => {
    return /\/(tv|movies)\/\d+\/?$/.test(path);
  };
  return (
    <>
      <div
        style={{
          backgroundImage:
            bg !== slider
              ? `linear-gradient(to bottom, rgba(15, 32, 58, 0.8), rgba(0, 0, 0, 0.70)), url(${bg}) `
              : `url(${bg})`,
        }}
        className={`pb-7 bg-cover bg-top ${
          location.pathname !== "/" ? `h-[180px] md:h-[250px]` : ``
        } ${isTvOrMovieDetailPage(location.pathname) ? "hidden" : ""}`}
      >
        <div className="container  w-11/12 sm:w-10/12">
          <header>
            <TopHeader />
            <SearchBox />
            {location.pathname === "/" ? (
              <>
                <FollowUs />
                <Slider setBg={setBg} />
              </>
            ) : null}
          </header>
        </div>
      </div>
      {children}
      {!renderFooter && <Footer />}
    </>
  );
};

export default Layout;
