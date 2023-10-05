import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { 
  // AiFillHeart,
  AiOutlineHeart
} from "react-icons/ai"

import { bookInterface, genreInterface } from "../../../model"

import LoadingAnimation from "../../../elements/loadingAnimation/Loading"
import Review from "../../../elements/review/Review"
import Rating from "../../../elements/Rating/Rating"
import RatingSubmission from "../../../elements/RatingSubmission/RatingSubmission"

import style from './style.module.css'
import { Link } from "react-router-dom"
import { RootState } from "../../../store/store"

export default function Book({ id }: { id: string }) {
  const user = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(true)
  const [bookData, setBookData] = useState<bookInterface>()
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [booksByAuthor, setBooksByAuthor] = useState<bookInterface[]>()

  // TODO: DELETE LETTER

  const [reviewRate, setReviewRate] = useState<number>(1)


  const getData = async (): Promise<void> => {
    try {
      const bookResult = (await axios.get<bookInterface>(`${import.meta.env.VITE_SERVER_LINK}/api/v1/books/${id}`)).data
      setBookData(bookResult);

      const authorsBooks = (await axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/v1/books/author/${bookResult.author!._id}`)).data
      setBooksByAuthor(authorsBooks);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);


    }
  }

  console.log(bookData);


  useEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });

    getData();

  }, [id])

  // TODO: delete later

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const Data: { [key: string]: string | Blob | number } = Object.fromEntries(new FormData(e.currentTarget).entries())
    Data.rate = reviewRate

    try {
      const result = await axios.put(`${import.meta.env.VITE_SERVER_LINK}/client/review/${id}`, Data, { withCredentials: true });

      console.log(result);
      getData();
      e.currentTarget.reset();

    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }


  return (<>
    {isLoading && <LoadingAnimation darkbackground />}
    {bookData ?
      <section className={style.profileSection}>
        <div className={style.subject}>
          <img className={style.subjectImg} src={bookData?.img} alt="" />
          <div className={style.subjectinfo}>
            <div className={style.header}>
              <div className={style.info}>
                <h2>{bookData?.name}</h2>
                <div className={style.genre}>
                  {bookData?.genre?.map((gen: genreInterface) => <p key={gen._id} className={style.cat}>{gen.name}</p>)}
                </div>
                <p className={style.authorSide}>By <Link to={`/Store/Profile/author?id=${bookData?.author!._id}`}>{bookData?.author!.name}</Link> (Author)</p>

                <Rating rating={4} />
              </div>
              <div className={style.action}>
                {/* // TODO: DO THE ADD TO CART AND CHECK WHEATHER U IT ALREADY ADDED OR NAH AND PUT THE REQUIRED ICON (FILLED OR OUTLINED) */}
                <button type="button" className={`${style.addToWishList} button b-purple white`}><AiOutlineHeart /></button>
              </div>
            </div>

            <p className={style.description}>{bookData?.description}</p>

            <div className={style.bookFooter}>
              <p className={style.bookStock}>{bookData?.quantity} books left</p>
              <p className={`${style.price} bold purple`}>{bookData?.price} DA</p>
              <button type="submit" className={`${style.addToCart} button white b-purple bold`}>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className={style.reviews}>
          <div className={style.header}>
            <p className={style.title}>REVIEWS</p>
          </div>
          <div className={style.comments}>
            {
              bookData?.review?.length > 0 ?
                bookData?.review.map(r => <Review rev={r} />)
                : <p className={style.noReviews}>No Review Submited</p>
            }

          </div>
          <form onSubmit={handleReviewSubmit} className={style.reviewSubmission} action="">
            <textarea name="review" id="" cols={15} rows={6} placeholder='Write a review' ></textarea><br />
            <span>
              <span>
                <RatingSubmission rating={reviewRate} size={20} onChange={user.isConnected ? (value) => setReviewRate(value) : () => false} />&nbsp;&nbsp;{reviewRate}/5
              </span>
              <button
                // disabled={!user.isConnected} 
                type="submit" className={`${style.submitButton} button b-purple white`} >Submit</button>
            </span>
          </form>
        </div>
      </section>
      :
      <section className={style.noData}>
        <div className={style.message}>
          <p>No Book Found</p>
          <Link to="/store" >Browse Books</Link></div>
      </section>
    }
  </>)
}

/**
 * 
 * 
 * ::-webkit-scrollbar the scrollbar.
 * ::-webkit-scrollbar-button the buttons on the scrollbar (arrows pointing upwards and downwards).
 * ::-webkit-scrollbar-thumb the draggable scrolling handle.
 * ::-webkit-scrollbar-track the track (progress bar) of the scrollbar.
 * ::-webkit-scrollbar-track-piece the track (progress bar) NOT covered by the handle.
 * ::-webkit-scrollbar-corner the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet.
 * ::-webkit-resizer the draggable resizing handle that appears at the bottom corner of some elements.
 * 
 * 
 * 
 */

