import { Link } from "react-router-dom";
import { BASE_IMG } from "../../config/api-config";

const MovieGrid = ({ movies, type }) => {
  return (
    movies && (
      <div className="flex flex-wrap gap-5 mb-10">
        {movies
          .filter((item) => item.poster_path)
          .map((item) => (
            <Link
              to={type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`}
              className="flex flex-col gap-2 w-[200px] bg-slate-700 pt-2 items-center rounded"
            >
              <img
                className="w-[180px] rounded"
                src={`${BASE_IMG}/w185/${item.poster_path}`}
              />
              <h2 className="text-center text-sm text-slate-300 py-1">
                {item.title || item.name}
              </h2>
            </Link>
          ))}
      </div>
    )
  );
};

export default MovieGrid;
