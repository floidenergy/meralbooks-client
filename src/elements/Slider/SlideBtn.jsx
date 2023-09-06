import React from 'react'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import style from './style.module.css'

export default function SlideBtn ({ direction, move }) {
  return (
    <button
      className={style.slideBtn + ' ' + style[direction]}
      type='button'
      onClick={move}
    >
      {direction === 'prev' ? <BsFillCaretLeftFill /> : <BsFillCaretRightFill />}
      {/* <GoTriangleLeft /> */}
    </button>
  )
}
