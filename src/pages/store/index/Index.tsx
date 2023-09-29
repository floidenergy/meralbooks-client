import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { bannerInterface, categoriesInterface, bookInterface, authorInterface } from '../../../model.ts'

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ImageSlider from '../../../elements/Slider/Slider'
import SearchBar from '../../../elements/searchbar/SearchBar'
import Card1 from '../../../elements/Card1/Card'
import LoadingAnimation from "../../../elements/loadingAnimation/Loading.tsx"

import style from './style.module.css'

import ebook from '../../../images/e-books.png'

// home banner slider delete later
import Banner1 from '../../../images/temp/banner_1.jpg'
import Banner2 from '../../../images/temp/banner_2.jpg'
import Banner3 from '../../../images/temp/banner_3.jpg'

// categories icons delete later
// import crimeIcon from '../../../images/categoriesIcons/crime-8.png'
// import fantasyIcon from "../../../images/categoriesIcons/fantasy-8.png"
// import kidsIcon from "../../../images/categoriesIcons/kids-8.png"
// import religionsIcon from "../../../images/categoriesIcons/religions-8.png"
// import romanceIcon from "../../../images/categoriesIcons/romance-8.png"
// import selfDevIcon from "../../../images/categoriesIcons/self dev-8.png"
// import technicalIcon from "../../../images/categoriesIcons/technicals-8.png"



/**
 * Renders a header section with an image slider.
 * Uses the useState and useEffect hooks to manage the state of the banners and fetch the banner data.
 * Each banner is wrapped in a Link component that navigates to a specific page when clicked.
 */
export default function Index() {
  const [banners, setBanners] = useState<bannerInterface[]>([]);
  const [categories, setCategories] = useState<categoriesInterface[]>([]);
  const [newAddedBooks, setNewAddedBooks] = useState<bookInterface[]>([]);
  const [recommandedBooks, setRecommandedBooks] = useState<bookInterface[]>([]);
  const [authors, setAuthors] = useState<authorInterface[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [currentAuthor, setCurrentAuthor] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    // TODO: MAKE API REQUEST TO FETCH ALL BANNERS
    setBanners([
      {
        id: '00001',
        img: Banner1
      },
      {
        id: '00002',
        img: Banner2
      },
      {
        id: '00003',
        img: Banner3
      }
    ])

    // TODO: MAKE API REQUEST TO FETCH ALL CATEGORIES
    setCategories([
      { id: "8779888d-c982-5d3b-ae7e-022273429b1b", count: 2, name: "Crime" },
      { id: "dee4fd6b-2bd0-5c6a-becd-b9c53477f176", count: 14, name: "Fantasy" },
      { id: "497625a6-b9c6-5347-9093-d8dcf6f1b0be", count: 17, name: "Kids " },
      { id: "dceeced4-cf68-55e0-b888-fa919ffea8dd", count: 4, name: "Religion" },
      { id: "30189d62-5f99-5ed4-8205-8dac757763d0", count: 14, name: "Romance" },
      { id: "bfaf1601-cd2d-5190-8d0e-2698858b5eb9", count: 1, name: "Self Dev" },
      { id: "3c0da7fb-3a12-5067-8237-95b6dafafb99", count: 15, name: "Technology" }
    ])

    const getData = async (): Promise<void> => {
      //TODO: MAKE API REQUEST TO FETCH NEWLY ADDED BOOKS AND RECOMMANDED BOOKS
      try {
        const Books = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/v1/books`)
        setNewAddedBooks(Books.data.slice(0, 6));
        setRecommandedBooks(Books.data.slice(0, 6));

        const Authors = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/v1/AUTHORS`)
        setAuthors(Authors.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAuthor((prevSlide) => prevSlide + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [recommandedBooks])

  return (
    <div className={style.StoreIndex}>
      {isLoading && <LoadingAnimation className={style.loadingPage} />}
      {/* <LoadingAnimation className={style.loadingPage}/> */}
      <header>
        <div className={style.sliderContainer}>
          <ImageSlider>
            {banners.map(banner => (
              <div key={banner.id}>
                <Link to={`MProfile?id=${banner.id}`}>
                  <img src={banner.img} alt='' />
                </Link>
              </div>
            ))}
          </ImageSlider>
        </div>
      </header>
      <SearchBar className={style.searchBar} />
      <section>
        <p className={`${style.title} bold`}>Books Categories</p>
        <div className={style.categoriesContainer}>
          {categories.map((cat, index) => (
            <div key={index} className={`${style.category} b-purple`}>
              <Link to={`Search?category=${cat.id}`}>
                <p className={style.name}>{cat.name}</p>
                <p className={style.count}>{cat.count}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section>
        <p className={`${style.title} bold`}>newly added books</p>
        <div className={style.cardsContainer}>
          {newAddedBooks.map(book => <Card1 key={book._id} className={style.card1} book={book} />)}
        </div>
      </section>
      <section className={`${style.eBookBanner}`}>
        <div className={`${style.info} white`}>
          <p className={style.bannerTitle}>Get Your<br />Free E-Book</p>
          <p className={style.bannerDescription}>
            We offer a range of free e-books to promote learning for all. Discover new subjects, explore different genres, and enhance your knowledge at no cost. Join us in unlocking the power of books.
          </p>
          <Link to={'#'} className='button b-white black'>See More</Link>
        </div>
        <img src={ebook} alt="" />
      </section>
      <section>
        <p className={`${style.title} bold`}>recommanded for you</p>
        <div className={`${style.sliderContainer}`}>
          <Swiper
            breakpoints={{
              1200: {
                slidesPerView: 3,
                // width: 20
              },
              750: {
                slidesPerView: 2,
                // width: 40,
              },
              100: {
                slidesPerView: 1,
                spaceBetween: 100
              }
            }}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{delay: 2500, disableOnInteraction: false}}
            centeredSlides={true}
            pagination={{ clickable: true}}
            onSlideChange={(slide) => setCurrentSlide(slide.realIndex)}
          className={style.slider}
          >
            {recommandedBooks.map((book, index) => (
              <SwiperSlide key={book._id} className={index === currentSlide ? style.activeSlide : ''}>
                <Card1 book={book} className={`${style.slide}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className={`${style.featuredAuthors}`}>
        <p className={`${style.title} bold white`}>featured authors</p>
        <div className={style.authorContainer}>
          {
            authors.map((author, index) => (
              <Link
                to={`/Store/Profile/author?id=${author._id}`}
                key={author._id}
                className={`${index === currentAuthor % authors.length ? style.activeAuthor : " "} ${style.author}`}
              >
                <img src={author.thumb} alt={author.name} />
                <p>{author.name}</p>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  )
}
