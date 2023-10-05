import style from "./style.module.css"
import { reviewInterface } from "../../model";

import Rating from "../Rating/Rating";


export default function Review({ rev }: { rev: reviewInterface }) {
  return (
    <div className={style.review}>
      <img src={rev.user.thumb} alt={rev.user.username} />
      <div className={style.data}>
        <div className={style.header}>
          <p className={style.userInfo}>{`${rev.user.name.fName} ${rev.user.name.lName}`}
            <span className={style.userName}>&nbsp;- @{rev.user.username}</span>
            <Rating rating={rev.rate} size={15}/>
          </p>
        </div>
        <p className={style.comment}>
          "{rev.review}"
        </p>
      </div>
    </div>
  )
}
