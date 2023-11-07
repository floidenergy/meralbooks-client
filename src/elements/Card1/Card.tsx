import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {addToWishList, removeFromWhishList} from "../../store/features/whishList"
import { bookInterface } from '../../model'

import style from './style.module.css'
import { RootState } from '../../store/store'


export default function Card1({ book, className }: { book: bookInterface, className?: string }) {
  const dispatcher = useDispatch();
  const whishList = useSelector((state: RootState) => state.whishList)
  return (
    <div className={`${className ? className : ""} ${style.Card1}`} >
      <div className={style.leftSide}>
        <img src={book.thumb} alt="" />
      </div>
      <div className={style.rightSide}>
        <div className={style.header}>
          <p className={style.title}>{book?.name}</p>
          <div className={style.catContainer}>
            {book.genre.slice(0, 2).map(cat => <p key={cat._id} className={style.cat}>{cat.name}</p>)}
          </div>
        </div>
        <div className={style.info}>
          <p className={style.description}>{book.description}</p>
          <p className={style.price}>{book.price} DA</p>
        </div>
        <div className={style.actions}>
          <button
            onClick={() => {
              const isExist = whishList.find(element => element._id === book._id)
              isExist ?
                dispatcher(removeFromWhishList(book._id)) :
                dispatcher(addToWishList(book))
            }}
            className={`button b-purple white`}
          >{whishList.find(element => element._id === book._id) ? "Remove from whishList" : "Add to whish List"}</button>
          <Link to={`Profile/book?id=${book._id}`} className={`button b-dark white`}>see More</Link>
        </div>
      </div>
    </div>
  )
}
