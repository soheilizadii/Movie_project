import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../components/layout/header/Footer";
import TopHeader from "../components/layout/header/TopHeader";
import Loading from "../components/Loading";
import { API_KEY, BASE_IMG, BASE_URL } from "../config/api-config";
import { FaPlay } from "react-icons/fa6";
import { IoListSharp } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
const MoviePage = ({ type }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [similar, setSimilar] = useState([]);
  const [externalIds, setExternalIds] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowTrailer, setIsShowTrailer] = useState(false);
  const [keyTrailer, setKeyTrailer] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    async function GET_MOVIE() {
      let Btype = type === "movie" ? "movie" : "tv";
      const { data } = await axios.get(`${BASE_URL}/${Btype}/${id}?${API_KEY}`);
      setMovie(data);

      const apiCredits = await axios.get(
        `${BASE_URL}/${Btype}/${id}/credits?${API_KEY}`
      );
      setCredits(apiCredits.data);

      const apisimilar = await axios.get(
        `${BASE_URL}/${Btype}/${id}/similar?${API_KEY}`
      );
      setSimilar(apisimilar.data.results);

      const ids = await axios.get(
        `${BASE_URL}/${Btype}/${id}/external_ids?${API_KEY}`
      );
      setExternalIds(ids.data);

      const apiKeywords = await axios.get(
        `${BASE_URL}/${Btype}/${id}/keywords?${API_KEY}`
      );
      let keyword =
        type === "movie" ? apiKeywords.data.keywords : apiKeywords.data.results;
      setKeywords(keyword);
      setIsLoading(false);
    }
    GET_MOVIE();
  }, [id]);

  async function GET_TRAILER() {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${id}/videos?${API_KEY}`
    );
    const officialTrailer = data.results.filter(
      (item) => item.official === true
    );
    console.log(officialTrailer);
    if (officialTrailer.length > 0 ){
      setKeyTrailer(officialTrailer[0].key);
    }
  }
  GET_TRAILER();

  return !isLoading ? (
    <div className="">
      {/* for  showing trailer  */}
      {isShowTrailer ? (
        <div
          className="fixed w-[100%] h-[100%]  top-0 left-0 flex justify-center items-center"
          style={{ backdropFilter: "blur(3px)" }}
        >
          <div className="lg:w-[50%] md:w-[70%] md:h-[400px] w-[90%] h-[300px]   bg-black rounded">
            <div className="flex justify-between border-b p-5 border-white">
              <p className="font-bold">Watch Trailer</p>
              <button
                className="font-bold"
                onClick={() => {
                  setIsShowTrailer(false);
                }}
              >
                X
              </button>
            </div>
            {keyTrailer ? ( <iframe
              className=" w-full h-full "
              src={`https://www.youtube.com/embed/${keyTrailer}?autoplay=1&modestbranding=1&controls=0&rel=0&mute=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>)  : <h1 className="flex justify-center h-[80%] items-center  font-bold text-xl md:text-2xl">There is no Trailer for this Movie</h1>}
           
          </div>
        </div>
      ) : null}

      {/* for  showing trailer  */}
      <div className="container  w-11/12 sm:w-10/12 h-[85px] md:h-auto ">
        <TopHeader />
      </div>
      <div
        className=" grid lg:py-16 py-10  h-auto md:h-[560px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 73.5, 73.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 73.5, 73.5, 0.84) 50%, rgba(31.5, 73.5, 73.5, 0.84) 100%) ,url(${BASE_IMG}/original/${movie.backdrop_path})`,
        }}
      >
        <div className=" container  w-11/12 sm:w-10/12 flex flex-col md:grid md:grid-cols-4 ">
          <img
            src={
              movie.poster_path
                ? `${BASE_IMG}/w342/${movie.poster_path}`
                : `/no_profile.png`
            }
            className="rounded-xl  col-span-1  h-[300px] md:h-auto "
          />
          <div className="col-span-3 flex flex-col ml-10 mt-10  md:mt-0 lg:mt-10">
            <div className="flex gap-2 items-center">
              <h1 className="font-bold md:text-2xl  text-xl text-center">
                {movie.title || movie.name}
              </h1>
              <p className="md:text-2xl text-xl">
                {movie.release_date && (
                  <span>({movie.release_date.split("-")[0]})</span>
                )}
                {movie.first_air_date && (
                  <span>({movie.first_air_date.split("-")[0]})</span>
                )}{" "}
              </p>
            </div>
            <div className="flex gap-1 items-center text-sm pt-3 md:pt-0">
              <p>{movie.release_date}</p>
              <GoDotFill />
              {movie.genres && movie.genres.map((item) => item.name).join(", ")}
            </div>
            <div className="flex  mt-5 gap-4 items-center">
              <button
                onClick={() => setIsShowTrailer(true)}
                className="flex items-center gap-2"
              >
                <FaPlay className="text-green-500" />
                <span className="text-slate-200">Play Trailer</span>
              </button>
              <button className="text-md bg-violet-700 p-3 rounded-full hover:text-yellow-400">
                <IoBookmark />
              </button>
              <button className="text-md bg-violet-700 p-3 rounded-full hover:text-yellow-400">
                <IoListSharp />
              </button>
              <button className="text-md bg-violet-700 p-3 rounded-full hover:text-yellow-400">
                <FaHeart />
              </button>
            </div>
            <div className="flex flex-col mt-5">
              <h3 className="text-xl font-bold">Overview</h3>
              <p className="text-[15px] leading-6 text-slate-300">
                {movie.overview}
              </p>
            </div>
            <div className="flex gap-10 mt-10">
              <div className="flex gap-x-20 gap-y-5 lg:gap-y-10 items-center flex-wrap">
                <div className="flex gap-1 items-center">
                  <p className="font-bold">Director :</p>
                  <p className="text-[15px]">
                    {credits.crew &&
                      credits.crew
                        .filter(
                          (item) =>
                            item.job === "Director" ||
                            item.job === "Executive Producer"
                        )
                        .slice(0, 1)
                        .map((item) => item.name)}
                  </p>
                </div>
                {credits.crew &&
                  credits.crew
                    .filter((item) => item.job !== "Director")
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 3)
                    .map((item) => (
                      <div className="flex gap-1 items-center" key={item.id}>
                        <p className="font-bold">{item.department} :</p>
                        <p className="text-[15px] text-slate-300">
                          {item.name}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container  flex flex-col md:grid md:grid-cols-4  w-11/12 sm:w-10/12 my-10 ">
        <div className=" col-span-3 ">
          <div className="flex-col overflow-hidden ">
            <h1 className="text-2xl mb-5 font-bold">Top Billed Cast </h1>
            <div className="flex gap-5  overflow-x-scroll ">
              {credits.cast &&
                credits.cast.slice(0, 10).map((item) => (
                  <Link
                    to={`/people/${item.id}`}
                    className="w-[110px] flex-shrink-0 bg-slate-700 p-1 rounded "
                  >
                    <img
                      className={item.profile_path ? "rounded" : "h-[153px]"}
                      src={
                        item.profile_path
                          ? `${BASE_IMG}/w185/${item.profile_path}`
                          : `/no_profile.png`
                      }
                    />
                    <h1 className="text-center text-sm py-3 ">{item.name}</h1>
                  </Link>
                ))}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-2xl font-bold mb-3">similar</h1>
            <div className="flex gap-2 rounded overflow-x-scroll md:overflow-x-auto ">
              {similar &&
                similar
                  .filter((item) => item.poster_path)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      to={
                        type == "movie"
                          ? `/movies/${item.id}`
                          : `/tv/${item.id}`
                      }
                      className="flex flex-col p-2 bg-slate-700 w-[160px] rounded md:w-auto  flex-shrink-0 md:flex-shrink "
                    >
                      <img
                        className="rounded w-[180px] h-[270px]"
                        src={`${BASE_IMG}/w342/${item.poster_path}`}
                      />
                      <h2 className="text-center py-2 text-slate-300">
                        {item.title || item.name}
                      </h2>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-slate-700 md:ml-10 mt-5 rounded flex flex-col px-5 pb-5">
          <div className="flex justify-center gap-6 text-2xl mt-10  text-white flex-wrap">
            <a
              target="_blank"
              href={
                externalIds.facebook_id
                  ? `https://www.facebook.com/${externalIds.facebook_id}`
                  : "#"
              }
              className="hover:text-yellow-500"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              href={
                externalIds.instagram_id
                  ? `https://www.instagram.com/${externalIds.instagram_id}`
                  : "#"
              }
              className="hover:text-red-600"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href={
                externalIds.youtube_id
                  ? `https://www.youtube.com/${externalIds.youtube_id}`
                  : "#"
              }
              className="hover:text-green-500"
            >
              <FaYoutube />
            </a>
            <a
              target="_blank"
              href={
                externalIds.tiktok
                  ? `https://www.tiktok.com/${externalIds.tiktok_id}`
                  : "#"
              }
              className="hover:text-violet-500"
            >
              <FaTiktok />
            </a>
          </div>
          <div className="mt-8">
            <p className="font-bold">Status: </p>
            <p className="text-[15px] text-slate-300">{movie.status}</p>
          </div>
          <div className="mt-8">
            <p className="font-bold">Original Language:</p>
            <p className="text-[15px] text-slate-300">
              {movie.spoken_languages && movie.spoken_languages[0].english_name}
            </p>
          </div>
          <div className="mt-8">
            <p className="font-bold">
              {type == "movie" ? "Budget:" : "number of Episodes:"}
            </p>
            <p className="text-[15px] text-slate-300">
              {type == "movie"
                ? `$ ${movie.budget && movie.budget.toLocaleString()}`
                : movie.number_of_episodes}
            </p>
          </div>
          <div className="mt-8">
            <p className="font-bold">
              {type == "movie" ? "Revenue:" : "number of Seasons:"}{" "}
            </p>
            <p className="text-[15px] text-slate-300">
              {type == "movie"
                ? `$ ${movie.revenue && movie.revenue.toLocaleString()}`
                : movie.number_of_seasons}
            </p>
          </div>
          <div className="mt-8">
            <p className="font-bold mb-4">Keywords: </p>
            <div className="flex flex-wrap gap-3">
              {keywords &&
                keywords.map((item) => (
                  <span className="bg-slate-600 py-[5px] px-[8px] rounded text-[13px]">
                    {item.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MoviePage;
