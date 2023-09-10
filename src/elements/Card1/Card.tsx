import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.css'

export interface bookCardProps {
  _id: string
  img: string
  name: string
  description: string
  price: number
  category: [{
    _id: string
    name: string
    description?: string
  }]
}

export default function Card1({ book, className }: { book: bookCardProps, className?: string }) {
  return (
    <div className={`${className ? className : ""} ${style.Card1}`} >
      <div className={style.leftSide}>
        <img src={book.img} alt="" />
      </div>
      <div className={style.rightSide}>
        <div className={style.header}>
          <p className={style.title}>{book?.name}</p>
          <div className={style.catContainer}>
            {book.category.slice(0, 2).map(cat => <p key={cat._id} className={style.cat}>{cat.name}</p>)}
          </div>
        </div>
        <div className={style.info}>
          <p className={style.description}>{book.description}</p>
          <p className={style.price}>{book.price} DA</p>
        </div>
        <div className={style.actions}>
          {
            // TODO : ADD THE FUNCTION TO ADD AN ITEM TO CART (REDUX TOOLKIT)
          }
          <Link to={"#"} className={`button b-purple white`}>Add to cart</Link>
          <Link to={`Profile/book?id=${book._id}`} className={`button b-dark white`}>see More</Link>
        </div>
      </div>
    </div>
  )
}
