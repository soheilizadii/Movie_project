import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MovieListSlider from "../components/MovieListSlider";
import { API_KEY, BASE_URL } from "../config/api-config";

const Home = ({ setRenderFooter }) => {
  console.log("value is", setRenderFooter);
  const [categoryMovie, setCategoryMovie] = useState("popular");
  const [categoryTv, setCategoryTv] = useState("airing_today");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function GET_MOVIE() {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${categoryMovie}?${API_KEY}`
      );
      setMovies(data.results);

      const res = await axios.get(`${BASE_URL}/tv/${categoryTv}?${API_KEY}`);
      setTv(res.data.results);
      setIsLoading(false);

      // setTimeout(() => {
      //   setRenderFooter(false);
      // }, 2000);
    }
    GET_MOVIE();

    // return () => {
    //   setRenderFooter(true); // This is the correct way to provide a cleanup function
    // };
  }, [categoryMovie, categoryTv]);

  return !isloading ? (
    <div className="  my-5 container  w-11/12 sm:w-10/12">
      <div className="my-10 flex flex-col md:flex-row md:gap-8 gap-6  md:items-center">
        <h1 className="text-2xl font-bold ">Movies </h1>
        <ul className="flex flex-col md:flex-row text-sm gap-4 lg:gap-2 text-yellow-100 cursor-pointer items-baseline font-bold">
          {["now_playing", "popular", "top_rated", "upcoming"].map(
            (category) => (
              <li
                key={category}
                className={`px-4 ${
                  categoryMovie === category ? "text-xl text-yellow-300" : ""
                }`}
                onClick={() => setCategoryMovie(category)}
              >
                {category
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </li>
            )
          )}
        </ul>
      </div>
      <MovieListSlider movies={movies} size={[6, 5, 3]} />

      <div className="my-10 flex flex-col md:flex-row md:gap-8 gap-6  md:items-center getActive() ">
        <h1 className="text-2xl font-bold">TV Shows </h1>
        <ul className="flex flex-col md:flex-row  gap-4 lg:gap-2 text-sm text-yellow-100 cursor-pointer items-baseline  font-bold">
          {["airing_today", "popular", "top_rated", "on_the_air"].map(
            (category) => (
              <li
                key={category}
                className={`px-4 ${
                  categoryTv === category ? "text-xl text-yellow-300" : ""
                }`}
                onClick={() => setCategoryTv(category)}
              >
                {category
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </li>
            )
          )}
        </ul>
      </div>
      <MovieListSlider movies={tv} size={[6, 5, 3]} type="tv" />
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
