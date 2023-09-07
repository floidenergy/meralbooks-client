import React, {useEffect, useState } from 'react'

import style from './style.module.css'
import SlideBtn from './SlideBtn'

export default function ImageSlider({ children }) {
  if (!children) {
    throw new Error(
      'no elements1 in ImageSlider please set elements: <ImageSlider>[<elements />]</ImageSlider>'
    )
  }
  const [slideIndex, setSlideIndex] = useState(null)
  const [timeoutId, setTimeoutId] = useState()

  const slideRight = () => {
    clearTimeout(timeoutId)
    if (slideIndex + 1 < children.length) setSlideIndex(slideIndex + 1)
    else setSlideIndex(0)
  }

  const slideLeft = () => {
    clearTimeout(timeoutId)
    if (slideIndex - 1 >= 0) setSlideIndex(slideIndex - 1)
    else setSlideIndex(children.length - 1)
  }
 

  useEffect(() => setSlideIndex(0), []);

  useEffect(() => {
    setTimeoutId(
      setTimeout(() => {
        if (slideIndex < children.length - 1) {
          setSlideIndex(slideIndex + 1)
        } else {
          setSlideIndex(0)
        }
      }, 2000)
    )
  }, [slideIndex])

  return (
    <div className={style.container}>
      <div className={style.card}>{children.at(slideIndex)}</div>
      <div className={style.imageBtn}>
        {children.map((el, index) => (
          <input
            onChange={(e) =>{
              clearTimeout(timeoutId);
              setSlideIndex(index);
            }}
            type='radio'
            name='imageBtn'
            checked={slideIndex === index}
            value={index}
            key={index}
          />
        ))}
      </div>
      <SlideBtn direction={'prev'} move={slideLeft} />
      <SlideBtn direction={'next'} move={slideRight} />
    </div>
  )
}
