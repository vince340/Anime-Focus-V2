import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import artplayerPluginChapter from "./artPlayerPluinChaper";
import autoSkip from "./autoSkip";
import artplayerPluginVttThumbnail from "./artPlayerPluginVttThumbnail";
import {
  backward10Icon,
  backwardIcon,
  captionIcon,
  forward10Icon,
  forwardIcon,
  fullScreenOffIcon,
  fullScreenOnIcon,
  loadingIcon,
  logo,
  muteIcon,
  pauseIcon,
  pipIcon,
  playIcon,
  playIconLg,
  settingsIcon,
  volumeIcon,
  screenshotIcon, // Added import for screenshot icon
} from "./PlayerIcons";
import "./Player.css";
import website_name from "@/src/config/website";
import getChapterStyles from "./getChapterStyle";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";

Artplayer.LOG_VERSION = false;
Artplayer.CONTEXTMENU = false;

const KEY_CODES = {
  M: "m",
  I: "i",
  F: "f",
  V: "v",
  SPACE: " ",
  ARROW_UP: "arrowup",
  ARROW_DOWN: "arrowdown",
  ARROW_RIGHT: "arrowright",
  ARROW_LEFT: "arrowleft",
};

export default function Player({
  streamUrl,
  subtitles,
  thumbnail,
  intro,
  outro,
  autoSkipIntro,
  autoPlay,
  autoNext,
  episodeId,
  episodes,
  playNext,
}) {
  const artRef = useRef(null);
  const proxy = import.meta.env.VITE_PROXY_URL;
  const m3u8proxy = import.meta.env.VITE_M3U8_PROXY_URL?.split(",") || [];
  const [playerProgress, setPlayerProgress] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(
    episodes?.findIndex(
      (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
    )
  );
  useEffect(() => {
    setPlayerProgress(0);
  }, [episodeId]);
  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);
  useEffect(() => {
    const applyChapterStyles = () => {
      const existingStyles = document.querySelectorAll(
        "style[data-chapter-styles]"
      );
      existingStyles.forEach((style) => style.remove());
      const styleElement = document.createElement("style");
      styleElement.setAttribute("data-chapter-styles", "true");
      const styles = getChapterStyles(intro, outro);
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
      return () => {
        styleElement.remove();
      };
    };

    if (streamUrl || intro || outro) {
      const cleanup = applyChapterStyles();
      return cleanup;
    }
  }, [streamUrl, intro, outro]);

  const playM3u8 = (video, url, art) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;

      art.on("destroy", () => hls.destroy());

      // hls.on(Hls.Events.ERROR, (event, data) => {
      //   console.error("HLS.js error:", data);
      // });
      video.addEventListener("timeupdate", () => {
        const currentTime = Math.round(video.currentTime);
        const duration = Math.round(video.duration);
        if (duration > 0) {
          if (currentTime >= duration) {
            art.pause();
            if (currentEpisodeIndex < episodes?.length - 1 && autoNext) {
              playNext(
                episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("timeupdate", () => {
        const currentTime = Math.round(video.currentTime);
        const duration = Math.round(video.duration);
        if (duration > 0) {
          if (currentTime >= duration) {
            art.pause();
            if (currentEpisodeIndex < episodes?.length - 1 && autoNext) {
              playNext(
                episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }
        }
      });
    } else {
      console.log("Unsupported playback format: m3u8");
    }
  };

  const createChapters = () => {
    const chapters = [];
    if (intro?.start !== 0 || intro?.end !== 0) {
      chapters.push({ start: intro.start, end: intro.end, title: "intro" });
    }
    if (outro?.start !== 0 || outro?.end !== 0) {
      chapters.push({ start: outro.start, end: outro.end, title: "outro" });
    }
    return chapters;
  };

  const handleKeydown = (event, art) => {
    const tagName = event.target.tagName.toLowerCase();

    if (tagName === "input" || tagName === "textarea") return;

    switch (event.key.toLowerCase()) {
      case KEY_CODES.M:
        art.muted = !art.muted;
        break;
      case KEY_CODES.I:
        art.pip = !art.pip;
        break;
      case KEY_CODES.F:
        event.preventDefault();
        event.stopPropagation();
        art.fullscreen = !art.fullscreen;
        break;
      case KEY_CODES.V:
        event.preventDefault();
        event.stopPropagation();
        art.subtitle.show = !art.subtitle.show;
        break;
      case KEY_CODES.SPACE:
        event.preventDefault();
        event.stopPropagation();
        art.playing ? art.pause() : art.play();
        break;
      case KEY_CODES.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        art.volume = Math.min(art.volume + 0.1, 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        art.volume = Math.max(art.volume - 0.1, 0);
        break;
      case KEY_CODES.ARROW_RIGHT:
        event.preventDefault();
        event.stopPropagation();
        art.currentTime = Math.min(art.currentTime + 10, art.duration);
        break;
      case KEY_CODES.ARROW_LEFT:
        event.preventDefault();
        event.stopPropagation();
        art.currentTime = Math.max(art.currentTime - 10, 0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!streamUrl || !artRef.current) return;

    const art = new Artplayer({
      url: m3u8proxy[Math.floor(Math.random() * m3u8proxy?.length)] + streamUrl,
      container: artRef.current,
      type: "m3u8",
      autoplay: autoPlay,
      volume: 1,
      setting: true,
      playbackRate: true,
      pip: true,
      hotkey: false,
      fullscreen: true,
      mutex: true,
      playsInline: true,
      lock: true,
      airplay: true,
      autoOrientation: true,
      fastForward: true,
      aspectRatio: true,
      subtitleOffset: true,
      plugins: [
        artplayerPluginHlsControl({
          quality: {
            setting: true,
            getName: (level) => level.height + "P",
            title: "Quality",
            auto: "Auto",
          },
        }),
        artplayerPluginChapter({ chapters: createChapters() }),
      ],
      subtitle: {
        style: {
          "font-weight": "400",
          height: "fit-content",
          minWidth: "fit-content",
          marginInline: "auto",
          "margin-top": "auto",
          "margin-bottom": "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
        },
        escape: false,
      },
      layers: [
        {
          name: website_name,
          html: logo,
          tooltip: website_name,
          style: {
            opacity: 1,
            position: "absolute",
            top: "5px",
            right: "5px",
            transition: "opacity 0.5s ease-out",
          },
        },
        {
          html: "",
          style: {
            position: "absolute",
            left: "50%",
            top: 0,
            width: "20%",
            height: "100%",
            transform: "translateX(-50%)",
          },
          disable: !Artplayer.utils.isMobile,
          click: function () {
            art.toggle();
          },
        },
        {
          name: "rewind",
          html: "",
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "40%",
            height: "100%",
          },
          disable: !Artplayer.utils.isMobile,
          click: () => {
            art.controls.show = !art.controls.show;
          },
        },
        {
          name: "forward",
          html: "",
          style: {
            position: "absolute",
            right: 0,
            top: 0,
            width: "40%",
            height: "100%",
          },
          disable: !Artplayer.utils.isMobile,
          click: () => {
            art.controls.show = !art.controls.show;
          },
        },
        {
          name: "backwardIcon",
          html: backwardIcon,
          style: {
            position: "absolute",
            left: "25%",
            top: "50%",
            transform: "translate(50%,-50%)",
            opacity: 0,
            transition: "opacity 0.5s ease-in-out",
          },
          disable: !Artplayer.utils.isMobile,
        },
        {
          name: "forwardIcon",
          html: forwardIcon,
          style: {
            position: "absolute",
            right: "25%",
            top: "50%",
            transform: "translate(50%, -50%)",
            opacity: 0,
            transition: "opacity 0.5s ease-in-out",
          },
          disable: !Artplayer.utils.isMobile,
        },
      ],
      controls: [
        {
          html: backward10Icon,
          position: "right",
          tooltip: "Backward 10s",
          click: () => {
            art.currentTime = Math.max(art.currentTime - 10, 0);
          },
        },
        {
          html: forward10Icon,
          position: "right",
          tooltip: "Forward 10s",
          click: () => {
            art.currentTime = Math.min(art.currentTime + 10, art.duration);
          },
        },
        {
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
          position: "right",
          tooltip: "Upload Subtitle",
          click: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.srt,.vtt';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                art.subtitle.switch(url, {
                  name: file.name,
                });
              }
            };
            input.click();
          },
        },
        {
          html: screenshotIcon,
          position: "right",
          tooltip: "Take Screenshot",
          click: () => {
            const canvas = document.createElement('canvas');
            canvas.width = art.video.videoWidth;
            canvas.height = art.video.videoHeight;
            canvas.getContext('2d').drawImage(art.video, 0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.download = `screenshot-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
          },
        },
      ],
      icons: {
        play: playIcon,
        pause: pauseIcon,
        setting: settingsIcon,
        volume: volumeIcon,
        pip: pipIcon,
        volumeClose: muteIcon,
        state: playIconLg,
        loading: loadingIcon,
        fullscreenOn: fullScreenOnIcon,
        fullscreenOff: fullScreenOffIcon,
      },
      customType: {
        m3u8: playM3u8,
      },
    });

    art.on("resize", () => {
      art.subtitle.style({
        fontSize:
          (art.width > 500 ? art.width * 0.02 : art.width * 0.03) + "px",
      });
    });
    art.on("ready", () => {
      art.currentTime = playerProgress;
      setTimeout(() => {
        art.layers[website_name].style.opacity = 0;
      }, 2000);
      art.on("video:progress", () => {
        setPlayerProgress(art.currentTime);
      });
      const ranges = [
        ...(intro.start != null && intro.end != null
          ? [[intro.start + 1, intro.end - 1]]
          : []),
        ...(outro.start != null && outro.end != null
          ? [[outro.start + 1, outro.end]]
          : []),
      ];
      document.addEventListener("keydown", (event) =>
        handleKeydown(event, art)
      );
      art.subtitle.style({
        fontSize:
          (art.width > 500 ? art.width * 0.02 : art.width * 0.03) + "px",
      });
      thumbnail &&
        art.plugins.add(
          artplayerPluginVttThumbnail({
            vtt: `${proxy}${thumbnail}`,
          })
        );
      const defaultEnglishSub =
        subtitles.find(
          (sub) => sub.label.toLowerCase() === "english" && sub.default
        ) || subtitles.find((sub) => sub.label.toLowerCase() === "english");
      subtitles &&
        subtitles.length > 0 &&
        art.setting.add({
          name: "captions",
          icon: captionIcon,
          html: "Subtitle",
          tooltip:
            subtitles.find((sub) => sub.label.toLowerCase() === "english")
              ?.label || "default",
          position: "right",
          selector: [
            {
              html: "Display",
              switch: true,
              onSwitch: function (item) {
                item.tooltip = item.switch ? "Hide" : "Show";
                art.subtitle.show = !item.switch;
                return !item.switch;
              },
            },
            ...subtitles.map((sub) => ({
              default:
                sub.label.toLowerCase() === "english" &&
                sub === defaultEnglishSub,
              html: sub.label,
              url: sub.file,
            })),
          ],
          onSelect: function (item) {
            art.subtitle.switch(item.url, { name: item.html });
            return item.html;
          },
        });
      {
        autoSkipIntro && art.plugins.add(autoSkip(ranges));
      }
      const defaultSubtitle = subtitles?.find(
        (sub) => sub.label.toLowerCase() === "english"
      );
      if (defaultSubtitle) {
        art.subtitle.switch(defaultSubtitle.file, {
          name: defaultSubtitle.label,
          default: true,
        });
      }
      const $rewind = art.layers["rewind"];
      const $forward = art.layers["forward"];
      Artplayer.utils.isMobile &&
        art.proxy($rewind, "dblclick", () => {
          art.currentTime = Math.max(0, art.currentTime - 10);
          art.layers["backwardIcon"].style.opacity = 1;
          setTimeout(() => {
            art.layers["backwardIcon"].style.opacity = 0;
          }, 300);
        });
      Artplayer.utils.isMobile &&
        art.proxy($forward, "dblclick", () => {
          art.currentTime = Math.max(0, art.currentTime + 10);
          art.layers["forwardIcon"].style.opacity = 1;
          setTimeout(() => {
            art.layers["forwardIcon"].style.opacity = 0;
          }, 300);
        });
    });
    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [streamUrl, subtitles, intro, outro]);

  return <div ref={artRef} className="w-full h-full"></div>;
}