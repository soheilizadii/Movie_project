import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
const SearchBox = ({
  totalMovies,
  setSortBy,
  sortBy,
  listMovie,
  setListMovie,
}) => {
  return (
    <div className="flex flex-col p-2 gap-4 md:gap-0 md:flex-row items-center border-t border-b border-slate-500 h-20 md:h-10 mb-10 md:justify-between text-slate-300 text-[14px]  ">
      <div className="flex md:justify-between justify-center   md:border-r border-slate-500 w-[70%] pr-2">
        <p>
          Found <span className="text-blue-500 ">{totalMovies} movies</span> in
          total
        </p>
        <span className="hidden md:block">Sort By:</span>
      </div>
      <div className="cursor-pointer">
        <select
          className="bg-transparent px-6 text-slate-50  text-[13px] "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option
            value="popularity.desc"
            className="bg-transparent text-gray-700 text-sm"
          >
            Popularity Descending
          </option>
          <option
            value="popularity.asc"
            className="bg-transparent text-gray-700"
          >
            Popularity Ascending
          </option>
          <option
            value="vote_average.desc"
            className="bg-transparent text-gray-700"
          >
            Rating Descending
          </option>
          <option
            value="vote_average.asc"
            className="bg-transparent text-gray-700"
          >
            Rating Ascending
          </option>
          <option
            value="primary_release_date.asc"
            className="bg-transparent text-gray-700"
          >
            Release_Date Ascending
          </option>
          <option
            value="primary_release_date.desc"
            className="bg-transparent text-gray-700"
          >
            Release_Date descending
          </option>
        </select>
      </div>
      <div className="flex gap-3 text-[18px]">
        <button
          className="border-l border-slate-500 pl-2 hidden md:block hover:text-green-600"
          onClick={() => setListMovie("grid")}
        >
          <BsFillGrid3X3GapFill />
        </button>
        <button
          className="border-l border-slate-500 pl-2 hidden md:block hover:text-green-600"
          onClick={() => setListMovie("list")}
        >
          <FaRegListAlt />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
