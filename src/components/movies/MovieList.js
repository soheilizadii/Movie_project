import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BASE_IMG } from "../../config/api-config";

const MovieList = ({ movies, credits, formatVote2, type }) => {
  return (
    <>
      {movies &&
        movies
          .filter((item) => item.poster_path)
          .map((item) => (
            <Link
              to={type == "movie" ? `/movies/${item.id}` : `/tv/${item.id}`}
              key={item.id}
              className="flex my-4 text-slate-300 bg-[#25344d4a] rounded p-2 flex-col md:flex-row"
            >
              <img
                src={`${BASE_IMG}/w342/${item.poster_path}`}
                className="md:h-full h-[300px] md:w-[150px] w-full rounded "
              />
              <div className="  pl-4  ">
                <div className="border-b border-slate-500 pb-3  flex flex-col gap-2.5">
                  <div className="flex gap-1 items-center mt-5 md:mt-0">
                    <p className="text-slate-50 ">{item.title || item.name}</p>
                    <span className="text-[11px] font-bold">
                      (
                      {item.release_date
                        ? item.release_date.split("-")[0]
                        : null}
                      ) (
                      {item.first_air_date
                        ? item.first_air_date.split("-")[0]
                        : null}
                      )
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="text-yellow-500">
                      <FaStar />
                    </span>
                    <span className="text-slate-50">
                      {formatVote2(item.vote_average)}
                      <span className="text-[14px]">/ 10</span>
                    </span>
                  </div>
                  <p className="text-[14px] h-[45px] overflow-hidden">
                    {item.overview}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <p>
                    Relase Date :{" "}
                    <span className="text-sm text-slate-100 font-bold">
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </span>{" "}
                  </p>
                  <p>
                    Director :
                    {credits
                      .find((credit) => credit.movieId === item.id)
                      ?.crew.filter(
                        (crewMember) => crewMember.job === "Director"
                      )
                      .map((director, index) => (
                        <Link
                          to={`/people/${director.id}`}
                          key={index}
                          className="text-blue-500 text-[14px]"
                        >
                          {director.name},
                        </Link>
                      ))}
                  </p>
                  <p>
                    Stars :
                    {credits &&
                      credits
                        .find((credit) => credit.movieId === item.id)
                        ?.credits.slice(0, 3)
                        .map((credit, index) => (
                          <Link key={index} to={`/people/${credit.id}`}>
                            <span className="text-blue-500 text-[14px]">
                              {credit.name},{" "}
                            </span>
                          </Link>
                        ))}
                  </p>
                </div>
              </div>
            </Link>
          ))}
    </>
  );
};

export default MovieList;
