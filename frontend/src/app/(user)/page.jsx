'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Home() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:3000,
      fade:true,
      lazyLoad:'progressive',
      swipe:true,
      swipeToSlide:true,
      pauseOnFocus:true,

    }
    return (
      <div>
        <Slider {...settings}>
          <div className="bg-primary-900 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/saxiphone.png" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="bg-primary-900 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/Drums.png" className="w-full h-full object-contain" />
            </div>
            
          </div>
          <div className="bg-primary-900 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/Notes.png" className="w-full h-full object-contain" />
            </div>
            
          </div>
          <div className="bg-primary-900 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/guitar.png" className="w-full h-full object-contain" />
            </div>
          </div>
        </Slider>
      </div>
    );
  };
