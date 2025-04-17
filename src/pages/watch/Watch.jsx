import { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/src/context/LanguageContext";
import { useHomeInfo } from "@/src/context/HomeInfoContext";
import { useWatch } from "@/src/hooks/useWatch";
import BouncingLoader from "@/src/components/ui/bouncingloader/Bouncingloader";
import Player from "@/src/components/player/Player";
import Episodelist from "@/src/components/episodelist/Episodelist";
import website_name from "@/src/config/website";
import Sidecard from "@/src/components/sidecard/Sidecard";
import CategoryCard from "@/src/components/categorycard/CategoryCard";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Servers from "@/src/components/servers/Servers";
import CategoryCardLoader from "@/src/components/Loader/CategoryCard.loader";
import { Skeleton } from "@/src/components/ui/Skeleton/Skeleton";
import SidecardLoader from "@/src/components/Loader/Sidecard.loader";
import Voiceactor from "@/src/components/voiceactor/Voiceactor";
import Watchcontrols from "@/src/components/watchcontrols/Watchcontrols";
import useWatchControl from "@/src/hooks/useWatchControl";

export default function Watch() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: animeId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  let initialEpisodeId = queryParams.get("ep");
  const [tags, setTags] = useState([]);
  const { language } = useLanguage();
  const { homeInfo } = useHomeInfo();
  const [showNextEpisodeSchedule, setShowNextEpisodeSchedule] = useState(true);
  const {
    // error,
    buffering,
    streamInfo,
    animeInfo,
    episodes,
    nextEpisodeSchedule,
    animeInfoLoading,
    totalEpisodes,
    isFullOverview,
    setIsFullOverview,
    activeEpisodeNum,
    streamUrl,
    subtitles,
    thumbnail,
    intro,
    outro,
    seasons,
    episodeId,
    setEpisodeId,
    activeServerId,
    setActiveServerId,
    servers,
    serverLoading,
  } = useWatch(animeId, initialEpisodeId);
  const {
    autoPlay,
    setAutoPlay,
    autoSkipIntro,
    setAutoSkipIntro,
    autoNext,
    setAutoNext,
  } = useWatchControl();
  useEffect(() => {
    if (!initialEpisodeId && episodes && episodes.length > 0 && !episodeId) {
      const firstEpisodeId = episodes[0].id.match(/ep=(\d+)/)?.[1];
      setEpisodeId(firstEpisodeId);
      window.history.replaceState(
        {},
        "",
        `/watch/${animeId}?ep=${firstEpisodeId}`
      );
    }
  }, [initialEpisodeId, episodes, episodeId, animeId]);

  useEffect(() => {
    if (animeInfo) {
      document.title = `Watch ${animeInfo.title} English Sub/Dub online Free on ${website_name}`;
    }
    return () => {
      document.title = `${website_name} | Free anime streaming platform`;
    };
  }, [animeId]);

  useEffect(() => {
    if (totalEpisodes !== null) {
      if (totalEpisodes === 0) {
        navigate(`/${animeId}`);
      }
    }
  }, [streamInfo, episodeId, animeId, totalEpisodes]);

  useEffect(() => {
    if (animeId) {
      const newEpisodeId = queryParams.get("ep");
      if (!newEpisodeId && episodes && episodes.length > 0) {
        const firstEpisodeId = episodes[0].id.match(/ep=(\d+)/)?.[1];
        setEpisodeId(firstEpisodeId);
        window.history.replaceState(
          {},
          "",
          `/watch/${animeId}?ep=${firstEpisodeId}`
        );
      } else {
        setEpisodeId(newEpisodeId);
        window.history.replaceState(
          {},
          "",
          `/watch/${animeId}?ep=${newEpisodeId}`
        );
      }
    }
  }, [animeId, episodes]);
  useEffect(() => {
    if (episodeId) {
      const newUrl = `/watch/${animeId}?ep=${episodeId}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [episodeId]);
  useEffect(() => {
    const adjustHeight = () => {
      if (window.innerWidth > 1200) {
        const player = document.querySelector(".player");
        const episodes = document.querySelector(".episodes");
        if (player && episodes) {
          episodes.style.height = `${player.clientHeight}px`;
        }
      } else {
        const episodes = document.querySelector(".episodes");
        if (episodes) {
          episodes.style.height = "auto";
        }
      }
    };
    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  });

  function Tag({ bgColor, index, icon, text }) {
    return (
      <div
        className={`flex space-x-1 justify-center items-center px-[4px] py-[1px] text-black font-semibold text-[13px] ${
          index === 0 ? "rounded-l-[4px]" : "rounded-none"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {icon && <FontAwesomeIcon icon={icon} className="text-[12px]" />}
        <p className="text-[12px]">{text}</p>
      </div>
    );
  }

  useEffect(() => {
    setTags([
      {
        condition: animeInfo?.animeInfo?.tvInfo?.rating,
        bgColor: "#ffffff",
        text: animeInfo?.animeInfo?.tvInfo?.rating,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.quality,
        bgColor: "#FFDD95",
        text: animeInfo?.animeInfo?.tvInfo?.quality,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.sub,
        icon: faClosedCaptioning,
        bgColor: "#B0E3AF",
        text: animeInfo?.animeInfo?.tvInfo?.sub,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.dub,
        icon: faMicrophone,
        bgColor: "#B9E7FF",
        text: animeInfo?.animeInfo?.tvInfo?.dub,
      },
    ]);
  }, [animeId, animeInfo]);
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center relative">
      <div className="w-full relative max-[1400px]:px-[30px] max-[1200px]:px-[80px] max-[1024px]:px-0">
        <img
          src={
            !animeInfoLoading
              ? animeInfo?.poster
              : "https://i.postimg.cc/rFZnx5tQ/2-Kn-Kzog-md.webp"
          }
          alt={`${animeInfo?.title} Poster`}
          className="absolute inset-0 w-full h-full object-cover filter grayscale z-[-900]"
        />
        <div className="absolute inset-0 bg-[#3A393E] bg-opacity-80 backdrop-blur-md z-[-800]"></div>
        <div className="relative z-10 px-4 pb-[50px] grid grid-cols-[minmax(0,75%),minmax(0,25%)] w-full h-full mt-[128px] max-[1400px]:flex max-[1400px]:flex-col max-[1200px]:mt-[64px] max-[1024px]:px-0 max-md:mt-[50px]">
          {animeInfo && (
            <ul className="flex absolute left-4 top-[-40px] gap-x-2 items-center w-fit max-[1200px]:hidden">
              {[
                ["Home", ""],
                [animeInfo?.showType, animeInfo?.showType],
              ].map(([text, link], index) => (
                <li key={index} className="flex gap-x-3 items-center">
                  <Link
                    to={`/${link}`}
                    className="text-white hover:text-[#FFDD95] text-[15px] font-semibold"
                  >
                    {text}
                  </Link>
                  <div className="dot mt-[1px] bg-white"></div>
                </li>
              ))}
              <p className="font-light text-[15px] text-gray-300 line-clamp-1 max-[575px]:leading-5">
                Watching{" "}
                {language === "EN"
                  ? animeInfo?.title
                  : animeInfo?.japanese_title}
              </p>
            </ul>
          )}
          <div className="flex w-full min-h-fit max-[1200px]:flex-col-reverse">
            <div className="episodes w-[35%] bg-[#201F23] flex justify-center items-center max-[1400px]:w-[380px] max-[1200px]:w-full max-[1200px]:h-full max-[1200px]:min-h-[100px]">
              {!episodes ? (
                <BouncingLoader />
              ) : (
                <Episodelist
                  episodes={episodes}
                  currentEpisode={episodeId}
                  onEpisodeClick={(id) => setEpisodeId(id)}
                  totalEpisodes={totalEpisodes}
                />
              )}
            </div>
            <div className="player w-full h-fit bg-black flex flex-col">
              <div className="w-full relative h-[480px] max-[1400px]:h-[40vw] max-[1200px]:h-[48vw] max-[1024px]:h-[58vw] max-[600px]:h-[65vw]">
                {!buffering ? (
                  <Player
                    streamUrl={streamUrl}
                    subtitles={subtitles}
                    intro={intro}
                    outro={outro}
                    thumbnail={thumbnail}
                    autoSkipIntro={autoSkipIntro}
                    autoPlay={autoPlay}
                    autoNext={autoNext}
                    episodeId={episodeId}
                    episodes={episodes}
                    playNext={(id) => setEpisodeId(id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <BouncingLoader />
                  </div>
                )}
                <p className="text-center underline font-medium text-[15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {!buffering && !streamInfo ? (
                    servers ? (
                      <>
                        Probably this server is down, try other servers
                        <br />
                        Either reload or try again after sometime
                      </>
                    ) : (
                      <>
                        Probably streaming server is down
                        <br />
                        Either reload or try again after sometime
                      </>
                    )
                  ) : null}
                </p>
              </div>

              {!buffering && (
                <Watchcontrols
                  autoPlay={autoPlay}
                  setAutoPlay={setAutoPlay}
                  autoSkipIntro={autoSkipIntro}
                  setAutoSkipIntro={setAutoSkipIntro}
                  autoNext={autoNext}
                  setAutoNext={setAutoNext}
                  episodes={episodes}
                  totalEpisodes={totalEpisodes}
                  episodeId={episodeId}
                  onButtonClick={(id) => setEpisodeId(id)}
                />
              )}
              <Servers
                servers={servers}
                activeEpisodeNum={activeEpisodeNum}
                activeServerId={activeServerId}
                setActiveServerId={setActiveServerId}
                serverLoading={serverLoading}
              />
              {seasons?.length > 0 && (
                <div className="flex flex-col gap-y-2 bg-[#11101A] p-4">
                  <h1 className="w-fit text-lg max-[478px]:text-[18px] font-semibold">
                    Watch more seasons of this anime
                  </h1>
                  <div className="flex flex-wrap gap-4 max-[575px]:grid max-[575px]:grid-cols-3 max-[575px]:gap-3 max-[480px]:grid-cols-2">
                    {seasons.map((season, index) => (
                      <Link
                        to={`/${season.id}`}
                        key={index}
                        className={`relative w-[20%] h-[60px] rounded-lg overflow-hidden cursor-pointer group ${
                          animeId === String(season.id)
                            ? "border border-[#FFDD95]"
                            : ""
                        } max-[1200px]:w-[140px] max-[575px]:w-full`}
                      >
                        <p
                          className={`text-[13px] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 z-30 line-clamp-2 group-hover:text-[#FFDD95] ${
                            animeId === String(season.id)
                              ? "text-[#FFDD95]"
                              : "text-white"
                          }`}
                        >
                          {season.season}
                        </p>
                        <div className="absolute inset-0 z-10 bg-[url('https://i.postimg.cc/pVGY6RXd/thumb.png')] bg-repeat"></div>
                        <img
                          src={season.season_poster}
                          alt=""
                          className="w-full h-full object-cover blur-[3px] opacity-50"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {nextEpisodeSchedule?.nextEpisodeSchedule &&
                showNextEpisodeSchedule && (
                  <div className="p-4">
                    <div className="w-full px-4 rounded-md bg-[#0088CC] flex items-center justify-between gap-x-2">
                      <div className="w-full h-fit">
                        <span className="text-[18px]">🚀</span>
                        {" Estimated the next episode will come at "}
                        <span className="text-[13.4px] font-medium">
                          {new Date(
                            new Date(
                              nextEpisodeSchedule.nextEpisodeSchedule
                            ).getTime() -
                              new Date().getTimezoneOffset() * 60000
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                      <span
                        className="text-[25px] h-fit font-extrabold text-[#80C4E6] mb-1 cursor-pointer"
                        onClick={() => setShowNextEpisodeSchedule(false)}
                      >
                        ×
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-start ml-8 max-[1400px]:ml-0 max-[1400px]:mt-10 max-[1400px]:flex-row max-[1400px]:gap-x-6 max-[1024px]:px-[30px] max-[1024px]:mt-8 max-[500px]:mt-4 max-[500px]:px-4">
            {animeInfo && animeInfo?.poster ? (
              <img
                src={animeInfo?.poster}
                alt=""
                className="w-[100px] h-[150px] object-cover max-[500px]:w-[70px] max-[500px]:h-[90px]"
              />
            ) : (
              <Skeleton className="w-[100px] h-[150px] rounded-none" />
            )}
            <div className="flex flex-col gap-y-4 justify-start">
              {animeInfo && animeInfo?.title ? (
                <p className="text-[26px] font-medium leading-6 max-[500px]:text-[18px]">
                  {language ? animeInfo?.title : animeInfo?.japanese_title}
                </p>
              ) : (
                <Skeleton className="w-[170px] h-[20px] rounded-xl" />
              )}
              <div className="flex flex-wrap w-fit gap-x-[2px] gap-y-[3px]">
                {animeInfo ? (
                  tags.map(
                    ({ condition, icon, bgColor, text }, index) =>
                      condition && (
                        <Tag
                          key={index}
                          index={index}
                          bgColor={bgColor}
                          icon={icon}
                          text={text}
                        />
                      )
                  )
                ) : (
                  <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                )}
                <div className="flex w-fit items-center ml-1">
                  {[
                    animeInfo?.animeInfo?.tvInfo?.showType,
                    animeInfo?.animeInfo?.tvInfo?.duration,
                  ].map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className="px-1 h-fit flex items-center gap-x-2 w-fit"
                        >
                          <div className="dot mt-[2px]"></div>
                          <p className="text-[14px]">{item}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
              {animeInfo ? (
                animeInfo?.animeInfo?.Overview && (
                  <div className="max-h-[150px] overflow-hidden">
                    <div className="max-h-[110px] mt-2 overflow-y-auto">
                      <p className="text-[14px] font-[400]">
                        {animeInfo?.animeInfo?.Overview.length > 270 ? (
                          <>
                            {isFullOverview
                              ? animeInfo?.animeInfo?.Overview
                              : `${animeInfo?.animeInfo?.Overview.slice(
                                  0,
                                  270
                                )}...`}
                            <span
                              className="text-[13px] font-bold hover:cursor-pointer"
                              onClick={() => setIsFullOverview(!isFullOverview)}
                            >
                              {isFullOverview ? "- Less" : "+ More"}
                            </span>
                          </>
                        ) : (
                          animeInfo?.animeInfo?.Overview
                        )}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="w-[200px] h-[10px] rounded-xl" />
                  <Skeleton className="w-[160px] h-[10px] rounded-xl" />
                  <Skeleton className="w-[100px] h-[10px] rounded-xl" />
                  <Skeleton className="w-[80px] h-[10px] rounded-xl" />
                </div>
              )}
              <p className="text-[14px] max-[575px]:hidden">
                {`${website_name} is the best site to watch `}
                <span className="font-bold">
                  {language ? animeInfo?.title : animeInfo?.japanese_title}
                </span>
                {` SUB online, or you can even watch `}
                <span className="font-bold">
                  {language ? animeInfo?.title : animeInfo?.japanese_title}
                </span>
                {` DUB in HD quality.`}
              </p>
              <Link
                to={`/${animeId}`}
                className="w-fit text-[13px] bg-white rounded-[12px] px-[10px] py-1 text-black"
              >
                View detail
              </Link>
              <div className="mt-8 bg-[#11101A] rounded-lg p-4">
                <p className="text-center mb-4">please donate to help the website to grow 🙏🥺?</p>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="https://ko-fi.com/animefocus" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#201F23] hover:bg-[#2a292f] rounded-lg p-3 cursor-pointer"
                  >
                    <i className="fas fa-donate" style={{color:'#08c'}}></i>
                    <span>Donate</span>
                  </a>
                  <a
                    href="https://discord.gg/kKnrGVqkr7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#201F23] hover:bg-[#2a292f] rounded-lg p-3 cursor-pointer"
                  >
                    <i className="fab fa-discord" style={{color:'#6f85d5'}}></i>
                    <span>Join Discord</span>
                  </a>
                  <div className="mt-4">
                    <a 
                      href="https://ko-fi.com/animefocus51327" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img 
                        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=animefocus4&button_colour=40DCA5&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"
                        alt="Buy Me A Coffee"
                        className="w-full"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {animeInfo && animeInfo.related_data ? (
            <Sidecard
              label="Related Anime"
              data={animeInfo.related_data}
              className="mt-[15px]"
            />
          ) : (
            <SidecardLoader className={"mt-[25px]"} />
          )}
          {homeInfo && homeInfo.most_popular && (
            <Sidecard
              label="Most Popular"
              data={homeInfo.most_popular.slice(0, 10)}
              className="mt-[15px]"
              limit={10}
            />
          )}
        </div>
      </div>
    </div>
  );
}
