import {useEffect, useState } from 'react'

import style from './style.module.css'
import SlideBtn from './SlideBtn'

export default function ImageSlider({ children }: {children: React.ReactElement[]}) {
  // const arr : Number[] = [5, 10, 12];
  if (!children) {
    throw new Error(
      'no elements1 in ImageSlider please set elements: <ImageSlider>[<elements />]</ImageSlider>'
    )
  }
  const [slideIndex, setSlideIndex] = useState<number>(-1)
  const [timeoutId, setTimeoutId] = useState<number>()

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
      }, 5000)
    )
  }, [slideIndex])

  return (
    <div className={style.container}>
      <div className={style.card}>{children[slideIndex]}</div>
      <div className={style.imageBtn}>
        {children.map((_, index) => (
          <input
            onChange={() =>{
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
