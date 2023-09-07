import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ImageSlider from '../../../elements/Slider/Slider'

import style from './style.module.css'

import Banner1 from '../../../images/temp/banner_1.jpg'
import Banner2 from '../../../images/temp/banner_2.jpg'
import Banner3 from '../../../images/temp/banner_3.jpg'

/**
 * Renders a header section with an image slider.
 * Uses the useState and useEffect hooks to manage the state of the banners and fetch the banner data.
 * Each banner is wrapped in a Link component that navigates to a specific page when clicked.
 */
export default function Index () {
  const [banners, setBanners] = useState([])

  useEffect(() => {
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
  }, [])

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
    </div>
  )
}
