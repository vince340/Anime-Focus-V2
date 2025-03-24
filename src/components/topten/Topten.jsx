import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/src/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import useToolTipPosition from "@/src/hooks/useToolTipPosition";
import Qtip from "../qtip/Qtip";

function Topten({ data, className }) {
  const { language } = useLanguage();
  const [activePeriod, setActivePeriod] = useState("today");
  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [hoveredItem, setHoveredItem] = useState(null);
  const currentData =
    activePeriod === "today"
      ? data.today
      : activePeriod === "week"
      ? data.week
      : data.month;
  const { tooltipPosition, tooltipHorizontalPosition, cardRefs } =
    useToolTipPosition(hoveredItem, currentData);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const handleMouseEnter = (item, index) => {
    const timeout = setTimeout(() => {
      setHoveredItem(item.id + index);
    }, 400);
    setHoverTimeout(timeout);
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHoveredItem(null);
  };
  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      <div className="flex justify-between items-center max-[350px]:flex-col max-[350px]:gap-y-2 max-[350px]:items-start">
        <h1 className="font-bold text-2xl text-[#ff3d7f]">Top 10</h1>
        <ul className="flex justify-between w-fit bg-[#3A393E] rounded-[4px] text-sm font-bold">
          <li
            className={`cursor-pointer p-2 px-3 ${
              activePeriod === "today"
                ? "bg-[#ff3d7f] text-[#555462] rounded-l-[4px]"
                : "text-white"
            } ${activePeriod !== "today" ? "hover:text-[#ff3d7f]" : ""}`}
            onClick={() => handlePeriodChange("today")}
          >
            Today
          </li>
          <li
            className={`cursor-pointer p-2 px-3 ${
              activePeriod === "week"
                ? "bg-[#ff3d7f] text-[#555462]"
                : "text-white"
            } ${activePeriod !== "week" ? "hover:text-[#ff3d7f]" : ""}`}
            onClick={() => handlePeriodChange("week")}
          >
            Week
          </li>
          <li
            className={`cursor-pointer p-2 px-3 ${
              activePeriod === "month"
                ? "bg-[#ff3d7f] text-[#555462] rounded-r-[4px]"
                : "text-white"
            } ${activePeriod !== "month" ? "hover:text-[#ff3d7f]" : ""}`}
            onClick={() => handlePeriodChange("month")}
          >
            Month
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-4 bg-[#2F2E33] p-4 pt-8 ">
        {currentData &&
          currentData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-x-4"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <h1
                className={`font-bold text-2xl  ${
                  index + 1 < 4
                    ? "pb-1 text-white border-b-[3px] border-[#ff3d7f]"
                    : "text-[#777682]"
                } max-[350px]:hidden`}
              >
                {`${index + 1 < 10 ? "0" : ""}${index + 1}`}
              </h1>
              <div
                style={{
                  borderBottom:
                    index + 1 < 10
                      ? "1px solid rgba(255, 255, 255, .075)"
                      : "none",
                }}
                className="flex pb-4 relative container items-center"
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-[60px] h-[75px] rounded-md object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/watch/${item.id}`)}
                  onMouseEnter={() => handleMouseEnter(item, index)}
                  onMouseLeave={handleMouseLeave}
                />
                {hoveredItem === item.id + index &&
                  window.innerWidth > 1024 && (
                    <div
                      className={`absolute ${tooltipPosition} ${tooltipHorizontalPosition} ${
                        tooltipPosition === "top-1/2"
                          ? "translate-y-[50px]"
                          : "translate-y-[-50px]"
                      } z-[100000] transform transition-all duration-300 ease-in-out ${
                        hoveredItem === item.id + index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <Qtip id={item.id} />
                    </div>
                  )}
                <div className="flex flex-col ml-4 space-y-2">
                  <Link
                    to={`/${item.id}`}
                    className="text-[1em] font-[500] hover:cursor-pointer hover:text-[#ff3d7f] transform transition-all ease-out line-clamp-1 max-[478px]:line-clamp-2 max-[478px]:text-[14px]"
                    onClick={() => handleNavigate(item.id)}
                  >
                    {language === "EN" ? item.title : item.japanese_title}
                  </Link>
                  <div className="flex flex-wrap items-center w-fit space-x-1 max-[350px]:gap-y-[3px]">
                    {item.tvInfo?.sub && (
                      <div className="flex space-x-1 justify-center items-center bg-[#B0E3AF] rounded-[4px] px-[4px] text-black py-[2px]">
                        <FontAwesomeIcon
                          icon={faClosedCaptioning}
                          className="text-[12px]"
                        />
                        <p className="text-[12px] font-bold">
                          {item.tvInfo.sub}
                        </p>
                      </div>
                    )}
                    {item.tvInfo?.dub && (
                      <div className="flex space-x-1 justify-center items-center bg-[#B9E7FF] rounded-[4px] px-[8px] text-black py-[2px]">
                        <FontAwesomeIcon
                          icon={faMicrophone}
                          className="text-[12px]"
                        />
                        <p className="text-[12px] font-bold">
                          {item.tvInfo.dub}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default React.memo(Topten);
