import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import { BASE_IMG } from "../config/api-config";
import { useRef } from "react";
const MovieListSlider = ({ movies, size, setBg, type }) => {
  const swiperRef = useRef(null); // Create a reference for the Swiper instance
  const handleMouseEnter = () => {
    swiperRef.current.autoplay.stop(); // Stop autoplay when mouse enters
  };

  // const handleMouseLeave = () => {
  //   swiperRef.current.autoplay.start(); // Start autoplay when mouse leaves
  // };
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign the Swiper instance to the ref
      breakpoints={{
        640: {
          spaceBetween: 20,
          slidesPerView: size[2],
        },
        768: {
          spaceBetween: 20,
          slidesPerView: size[1],
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: size[0],
        },
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: "2000" }}
      loop={true}
    >
      {movies.map((item) => {
        return (
          <SwiperSlide
            key={item.id}
            // onMouseOver={
            //   setBg
            //     ? (e) => setBg(`${BASE_IMG}/original${item.poster_path}`)
            //     : null
            // }
            // onMouseEnter={handleMouseEnter} // Assign mouse enter event
            // onMouseLeave={handleMouseLeave} // Assign mouse leave event
          >
            <MovieCard detail={item} type={type} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MovieListSlider;
