import { BsStarFill } from 'react-icons/bs'
import { bookInterface } from '../../model'

import style from './style.module.css'

export default function Card2({ book, className }: { book: bookInterface, className?: string }) {
  return (
    <div className={`${className} ${style.card}`}>
      <img src={book.thumb} alt={book.name} className={style.thumb} />
      <div>
        <p className={style.title}>{book.name}</p>
        <div className={style.info}>
          <p className={style.price}>{book.price}</p>
          <span className={style.rating}>{book.rating}/5 <span className="ratingStars"><BsStarFill /></span></span>
        </div>
      </div>
    </div>
  )
}
