import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y, Zoom, Autoplay } from 'swiper/modules'
import 'swiper/css'
import "swiper/css/zoom"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import ImageSlider from '../../../elements/Slider/Slider'
import SearchBar from '../../../elements/searchbar/SearchBar'
import Card1 from '../../../elements/Card1/Card'

import style from './style.module.css'

import ebook from '../../../images/e-books.png'

// home banner slider delete later
import Banner1 from '../../../images/temp/banner_1.jpg'
import Banner2 from '../../../images/temp/banner_2.jpg'
import Banner3 from '../../../images/temp/banner_3.jpg'

// categories icons delete later
import crimeIcon from '../../../images/categoriesIcons/crime-8.png'
import fantasyIcon from "../../../images/categoriesIcons/fantasy-8.png"
import kidsIcon from "../../../images/categoriesIcons/kids-8.png"
import religionsIcon from "../../../images/categoriesIcons/religions-8.png"
import romanceIcon from "../../../images/categoriesIcons/romance-8.png"
import selfDevIcon from "../../../images/categoriesIcons/self dev-8.png"
import technicalIcon from "../../../images/categoriesIcons/technicals-8.png"


interface bannerInterface {
  id: string;
  img: string;
}

interface categoriesInterface {
  icon: string
  name: string
  value: string
}

interface bookInterface {
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

interface authorInterface {
  _id: string
  name: string
  img: string
}

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
      { icon: crimeIcon, name: "Crime", value: 'crime' },
      { icon: fantasyIcon, name: "Fantasy", value: 'Fantasy' },
      { icon: kidsIcon, name: "Kids ", value: 'Kids' },
      { icon: religionsIcon, name: "Religion", value: "Religion" },
      { icon: romanceIcon, name: "Romance", value: "Romance" },
      { icon: selfDevIcon, name: "Self Dev", value: 'Self Development' },
      { icon: technicalIcon, name: "Technology", value: "Technology" }
    ])

    //TODO: MAKE API REQUEST TO FETCH NEWLY ADDED BOOKS
    axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/v1/books`).then(r => {
      setNewAddedBooks(r.data.slice(0, 6));
      setRecommandedBooks(r.data.slice(0, 6));
    })

    //TODO: MAKE API REQUEST TO FETCH FEATURED AUTHORS
    axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/v1/AUTHORS`).then(r => {
      setAuthors(r.data.slice(0, 6));
      console.log(r.data.slice(0, 6));
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAuthor((prevSlide) => (prevSlide + 1) % authors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [recommandedBooks])

  return (
    <div className={style.StoreIndex}>
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
            <div key={index} className={style.category}>
              <Link to={`Search?category=${cat.value}`}>
                <img src={cat.icon} alt="" />
                <p className={style.name}>{cat.name}</p>
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
            modules={[Pagination, A11y, Zoom, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            zoom
            autoplay
            loop
            centeredSlides
            pagination={{ clickable: true, }}
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
                className={`${index === currentAuthor ? style.activeAuthor : " "} ${style.author}`}
              >
                <img src={author.img} alt="" />
                <p>{author.name}</p>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  )
}
