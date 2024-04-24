import { Link } from "react-router-dom";
import { BASE_IMG } from "../../config/api-config";

const Movie = ({ result, setSearchResult, setQuery }) => {
  function GET_DATE(date) {
    return date.split("-")[0];
  }
  const clickHandler = () => {
    setSearchResult([]);
    setQuery(null);
  };
  return (
    <>
      {result
        .filter((k) => k.poster_path)
        .map((item) => (
          <Link to={`/movies/${item.id}`} onClick={clickHandler}>
            <li
              key={item.id}
              className="flex gap-2 items-center py-2 text-slate-300 border-b border-slate-400 border-opacity-55 "
            >
              <img
                className="rounded-full h-[45px] w-[45px]  object-cover"
                src={
                  item.poster_path
                    ? `${BASE_IMG}/w92/${item.poster_path}`
                    : `/no_profile.jpg`
                }
              />
              <p>{item.title}</p>
              {item.release_date && (
                <span className="text-sm text-slate-400">
                  ({GET_DATE(item.release_date)})
                </span>
              )}
            </li>
          </Link>
        ))}
    </>
  );
};

export default Movie;
