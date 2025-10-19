import React, { useMemo, useState } from "react";

interface Material {
  votes: number[];
}

interface RatingProps {
  material: Material;
  onRate?: (value: number) => void;
}

function Rating({ material, onRate }: RatingProps) {
  const currentRating = useMemo(() => {
    if (!Array.isArray(material.votes) || material.votes.length === 0) return 0;
    const total = material.votes.reduce((sum, val) => sum + val, 0);
    return Math.round(total / material.votes.length);
  }, [material.votes]);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleChange = (value: number) => {
    setSelectedRating(value);
    onRate?.(value);
  };

  const ratingToShow = selectedRating ?? currentRating;

  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((star) => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`star-${star}`}
            name="rate"
            value={star}
            checked={ratingToShow === star}
            onChange={() => handleChange(star)}
          />
          <label htmlFor={`star-${star}`} title={`${star} estrellas`} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Rating;
