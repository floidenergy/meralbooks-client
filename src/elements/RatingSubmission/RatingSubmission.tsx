import React, { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import style from './style.module.css'

export default function RatingSubmission({rating, size = 15, onChange} : {rating: number, size?: number, onChange: (value:number) => void}) {

  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    let rate: number = rating;
    const starsArray: React.ReactNode[] = [];

    for (let i = 0; i < 5; i++) {
      if (rate >= 1) {
        starsArray.push(<BsStarFill key={i} size={size} />);
        rate--;
      } else if (rate > 0 && rate < 1) {
        starsArray.push(<BsStarHalf key={i} size={size} />);
        rate = 0;
      } else {
        starsArray.push(<BsStar key={i} size={size} />);
      }
    }
    setStars(starsArray);
  }, [rating, size]);


  return <div className={style.ratingStars}>
      {stars.map((Star, index) => (
        <span key={index} className={style.rateStar} onMouseOver={() => onChange(index + 1)}>{Star}</span>
      ))}
    </div>;
}
