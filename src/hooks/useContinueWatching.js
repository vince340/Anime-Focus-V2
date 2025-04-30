
import { useState, useEffect } from 'react';

export default function useContinueWatching() {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('continueWatching');
    if (savedHistory) {
      setWatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToWatchHistory = (anime) => {
    const updatedHistory = [anime, ...watchHistory.filter(item => item.id !== anime.id)].slice(0, 12);
    setWatchHistory(updatedHistory);
    localStorage.setItem('continueWatching', JSON.stringify(updatedHistory));
  };

  const removeFromWatchHistory = (animeId) => {
    const updatedHistory = watchHistory.filter(item => item.id !== animeId);
    setWatchHistory(updatedHistory);
    localStorage.setItem('continueWatching', JSON.stringify(updatedHistory));
  };

  return { watchHistory, addToWatchHistory, removeFromWatchHistory };
}
