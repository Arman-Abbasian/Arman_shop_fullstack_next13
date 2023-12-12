'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Home() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      fade:true,
      lazyLoad:'ondemand',
      className:'height:100%'

    }
    return (
      <div>
        <Slider {...settings}>
          <div className="bg-primary-600 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/santoor.png" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-16 h-[3rem] mx-16 text-xl">
              <p>santoor gholami 3 mohr</p>
              <p>120$</p>
            </div>
          </div>
          <div className="bg-primary-600 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/santoor.png" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-16 h-[3rem] mx-16 text-xl">
              <p>santoor gholami 3 mohr</p>
              <p>120$</p>
            </div>
          </div>
          <div className="bg-primary-600 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/santoor.png" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-16 h-[3rem] mx-16 text-xl">
              <p>santoor gholami 3 mohr</p>
              <p>120$</p>
            </div>
          </div>
          <div className="bg-primary-600 h-[calc(100vh-10rem)] rounded-md">
            <div className="h-[calc(100%-3rem)]">
            <img src="/images/santoor.png" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-16 h-[3rem] mx-16 text-xl">
              <p>santoor gholami 3 mohr</p>
              <p>120$</p>
            </div>
          </div>
        </Slider>
      </div>
    );
  };
