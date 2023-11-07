import { useCallback, useEffect, useState } from "react"
// import Api from "axios"
import API from "../../../utils/Axios"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import { addToCart, removeFromCart } from "../../../store/features/cartItems"
import { addToWishList, removeFromWhishList } from '../../../store/features/whishList'
import {
  AiFillHeart,
  AiOutlineHeart
} from "react-icons/ai"

import { bookInterface, genreInterface } from "../../../model"

import LoadingAnimation from "../../../elements/loadingAnimation/Loading"
import Card2 from "../../../elements/Card2/Card2"
import Review from "../../../elements/review/Review"
import Rating from "../../../elements/Rating/Rating"
import RatingSubmission from "../../../elements/RatingSubmission/RatingSubmission"
import Counter from "../../../elements/Counter/Counter"

import style from './style.module.css'
import { RootState } from "../../../store/store"

export default function Book({ bookID }: { bookID: string }) {
  const user = useSelector((state: RootState) => state.user);
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const whishList = useSelector((state: RootState) => state.whishList);

  const dispatcher = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bookData, setBookData] = useState<bookInterface>()

  const [booksByAuthor, setBooksByAuthor] = useState<bookInterface[]>()
  const [booksByGenre, setBooksByGenre] = useState<bookInterface[]>()

  const [orderQuantity, setOrderQuantity] = useState<number>(1)
  const [reviewRate, setReviewRate] = useState<number>(1)


  const getData = useCallback(async (): Promise<void> => {
    try {
      const bookResult = (await API.get<bookInterface>(`/api/v1/books/${bookID}`)).data
      setBookData(bookResult);

      API.get<bookInterface[]>(`/api/v1/books/author/${bookResult.author!._id}`).then(result => setBooksByAuthor(result.data))
      API.get<bookInterface[]>(`/api/v1/books/genre/${bookResult.genre[0]._id}`).then(result => setBooksByGenre(result.data))

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [bookID])


  useEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });
    getData();
  }, [bookID, getData, bookID])

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const Data: { [key: string]: string | Blob | number } = Object.fromEntries(new FormData(e.currentTarget).entries())
    Data.rate = reviewRate

    try {
      await API.put(`/client/review/${bookID}`, Data);
      getData();
      setReviewRate(1)
      e.currentTarget.reset()
    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }


  return (<>
    {isLoading && <LoadingAnimation darkbackground />}
    {bookData ?
      (
        <>
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
                    <span className={style.ratingSection}><Rating rating={bookData.rating} /> {bookData.rating} / 5</span>
                  </div>
                  <div className={style.action}>
                    <button
                      type="button"
                      className={`${style.addToWishList} button b-purple white`}
                      onClick={() => {
                        const isExist = whishList.find(element => element._id === bookData._id);
                        isExist ?
                          dispatcher(removeFromWhishList(bookData._id))
                          :
                          dispatcher(addToWishList(bookData))
                      }}
                    >
                      {whishList.find(element => element._id === bookData._id) ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                  </div>
                </div>

                <p className={style.description}>{bookData?.description}</p>
                {!cartItems.find(element => element.item._id === bookData._id) && <Counter value={orderQuantity} onChange={value => setOrderQuantity(value)} />}
                <div className={style.bookFooter}>
                  <p className={style.bookStock}>{bookData?.quantity} books left</p>
                  <p className={`${style.price} bold purple`}>{bookData?.price} DA</p>
                  <button type="submit" className={`${style.addToCart} button white b-purple bold`}
                    onClick={() => {
                      const isExist = cartItems.find(element => element.item._id === bookData._id);
                      isExist ?
                        dispatcher(removeFromCart(bookData._id)) :
                        dispatcher(addToCart({ item: bookData, quantity: orderQuantity }))
                    }}
                  >{cartItems.find(element => element.item._id === bookData._id) ? "Remove From Cart" : "Add To Cart"}</button>
                </div>
              </div>
            </div>
            <div className={style.reviews}>
              <div className="headerTitle">
                <p className="title">REVIEWS</p>
              </div>
              <div className={style.comments}>
                {
                  bookData?.review?.length > 0 ?
                    bookData?.review.map(r => <Review rev={r} key={r._id} />)
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
                    disabled={!user.isConnected}
                    type="submit" className={`${style.submitButton} button b-purple white`} >Submit</button>
                </span>
              </form>
            </div>
          </section>
          <section className={style.suggestions}>
            <div className="headerTitle">
              <p className="title">More on {bookData.author?.name}'s books</p>
            </div>
            <div className={style.content}>
              {
                booksByAuthor?.slice(0, 6).map(book => (
                  <Card2 key={book._id} link={`?id=${book._id}`} book={book} className={style.card} />
                ))
              }
            </div>
          </section>
          <section className={style.suggestions}>
            <div className="headerTitle">
              <p className="title">More on {bookData.genre[0].name} books</p>
            </div>
            <div className={style.content}>
              {
                booksByGenre?.slice(0, 6).map(book => (
                  <Card2 key={book._id} link={`?id=${book._id}`} book={book} className={style.card} />
                ))
              }
            </div>
          </section>
        </>
      )
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

