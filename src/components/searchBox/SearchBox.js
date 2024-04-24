import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { API_KEY, BASE_URL } from "../../config/api-config";
import Movie from "../searchBox/Movie";
import Person from "../searchBox/Person";
import Tv from "../searchBox/Tv";
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState("movie");
  useEffect(() => {
    const timeOut = setTimeout(async () => {
      const { data } = await axios.get(
        `${BASE_URL}/search/${selectedOption}?${API_KEY}&query=${query}`
      );
      setSearchResult(data.results);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [query, selectedOption]);
  function renderComponent() {
    switch (selectedOption) {
      case "movie":
        return (
          <Movie
            result={searchResult}
            setQuery={setQuery}
            setSearchResult={setSearchResult}
          />
        );
      case "tv":
        return (
          <Tv
            result={searchResult}
            setQuery={setQuery}
            setSearchResult={setSearchResult}
          />
        );
      case "person":
        return (
          <Person
            result={searchResult}
            setQuery={setQuery}
            setSearchResult={setSearchResult}
          />
        );
      default:
        return null;
    }
  }
  return (
    <section className="lg:mt-10  h-10 lg:h-12 flex relative rounded-md">
      <select
        className="bg-slate-700 lg:px-4 px-2 border-r border-slate-400 rounded-tl-xl rounded-bl-xl"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="movie">Movie</option>
        <option value="tv">Tv Show</option>
        <option value="person">Person</option>
      </select>
      <input
        type="text"
        className="w-full bg-slate-700 h-full px-3  text-[12px]  md:text-sm outline-none md:rounded-none rounded-tr-xl rounded-br-xl "
        placeholder="Search for a movie , Tv Show or celebrity that you are looking for "
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <ul
        className={`absolute top-[100%] bg-slate-800 w-[99%] m-auto border-black border-4  z-10  overflow-hidden ${
          query && searchResult.length
            ? `max-h-96 overflow-scroll  p-2 `
            : `h-0 border-none py-0  `
        } 
        transition-all duration-500  `}
      >
        {query && searchResult && renderComponent()}
      </ul>
      <span className=" bg-slate-700 w-14 h-full md:flex items-center justify-center p-2   rounded-tr-xl rounded-br-xl hidden ">
        <IoIosSearch className="w-full h-full " />
      </span>
    </section>
  );
};

export default SearchBox;
