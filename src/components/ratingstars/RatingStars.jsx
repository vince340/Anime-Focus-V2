
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingStars = ({ animeId, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    // Load saved rating from localStorage
    const savedRating = localStorage.getItem(`anime-rating-${animeId}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [animeId]);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
    // Save rating to localStorage
    localStorage.setItem(`anime-rating-${animeId}`, selectedRating.toString());
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-xl focus:outline-none transition-colors ${
              (hover || rating) >= star ? 'text-[#FFDD95]' : 'text-gray-400'
            }`}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-300">
        {rating ? `${rating}/5` : 'Rate this anime'}
      </span>
    </div>
  );
};

export default RatingStars;
