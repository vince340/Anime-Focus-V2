
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
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
            <FontAwesomeIcon 
              icon={(hover || rating) >= star ? faStarSolid : faStarRegular}
            />
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
