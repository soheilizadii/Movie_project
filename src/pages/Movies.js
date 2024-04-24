import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../config/api-config";
import Loading from "../components/Loading";
import SearchBox from "../components/movies/SearchBox";
import MovieList from "../components/movies/MovieList";
import MovieGrid from "../components/movies/MovieGrid";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";

const Movies = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [formatVote, setFormatVote] = useState(null);
  const [credits, setCredits] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(false);
  const [listMovie, setListMovie] = useState("list");
  const [pages, setPages] = useState(null);
  const { page } = useParams();
  const [activePage, setActivePage] = useState(Number(page));
  useEffect(() => {
    setIsLoading(true);
    const currentPage = Number(page) || 1; // Convert page from URL to number, defaulting to 1 if undefined
    async function GET_MOVIES() {
      const { data } = await axios.get(
        `${BASE_URL}/discover/${type}?${API_KEY}&sort_by=${sortBy}&page=${page}`
      );
      setTotalMovies(data.total_results);
      setMovies(data.results);

      setPages(data.total_pages);
      const creditsPromises = data.results.map((movie) =>
        axios.get(`${BASE_URL}/${type}/${movie.id}/credits?${API_KEY}`)
      );
      const creditsResponses = await Promise.all(creditsPromises);
      const creditsData = creditsResponses.map((response, index) => ({
        movieId: data.results[index].id,
        credits: response.data.cast, // Assuming you want the cast, modify as needed
        crew: response.data.crew, // Include the crew data
      }));
      setCredits(creditsData);
      setIsLoading(false);
    }
    GET_MOVIES();
  }, [sortBy, listMovie, page, type]);
  function formatVote2(item) {
    const voteString = String(item);

    if (voteString.includes(".") && voteString.split(".")[1].length > 0) {
      const newVote = voteString.split(".");
      const firstDecimalDigit = newVote[1][0];
      const formattedVote = `${newVote[0]}.${firstDecimalDigit}`;
      return formattedVote;
    } else {
      return item;
    }
  }
  async function GET_CREDITS(id) {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${id}/credits?${API_KEY}`
    );
    setCredits(data);
  }
  return !isLoading ? (
    <div className="container   w-11/12 sm:w-10/12  mt-8 grid grid-cols-4">
      <div className="col-span-4">
        <h1 className="text-2xl mb-5 ">Movies</h1>
        <SearchBox
          totalMovies={totalMovies}
          setSortBy={setSortBy}
          sortBy={sortBy}
          listMovie={listMovie}
          setListMovie={setListMovie}
        />
        {listMovie == "list" ? (
          <MovieList
            movies={movies}
            credits={credits}
            formatVote2={formatVote2}
            type={type}
          />
        ) : (
          <MovieGrid movies={movies} type={type} />
        )}
        <div className=" flex  justify-center">
          <Pagination
            page={Number(page)}
            setActivePage={setActivePage}
            type={type}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
