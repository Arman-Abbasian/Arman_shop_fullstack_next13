"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProducts } from "@/hooks/useProducts";
import Loading from "@/common/Loading";

export default function Home() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  console.log(products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    lazyLoad: "progressive",
    swipe: true,
    swipeToSlide: true,
    pauseOnFocus: true,
  };
  if (isLoading) return <Loading />;
  return (
    <div>
      <Slider {...settings}>
        {Array.isArray(products) &&
          products.slice(0, 10).map((product) => {
            return (
              <div className="bg-primary-900 h-[calc(100vh-12rem)] rounded-md">
                <div className="h-[calc(100%-3rem)]">
                  <img
                    src={product.imageLink}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-5 h-[3rem] mx-16 text-xl">
                  <p>{product.title}</p>
                  <p>{product.brand}</p>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
