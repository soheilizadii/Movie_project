import MovieListSlider from "../../MovieListSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../../config/api-config";

const Slider = ({ setBg }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function GET_MOVIE() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/movie/popular?${API_KEY}`
        );
        setMovies(data.results);
      } catch {
        console.log("Error");
      }
    }
    GET_MOVIE();
  }, []);
  return (
    <div className="mt-10 ">
      <MovieListSlider movies={movies} setBg={setBg} size={[4, 3, 2]} />
    </div>
  );
};

export default Slider;
