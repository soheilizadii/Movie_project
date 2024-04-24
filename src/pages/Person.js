import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY, BASE_IMG, BASE_URL } from "../config/api-config";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Loading from "../components/Loading";
const Person = () => {
  const [userDetail, setUserDetail] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [fadeEffect, setFadeEffect] = useState(false);
  const [userCredits, setUserCredits] = useState([]);
  const [showToggle, setShowToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [externalIds, setExternalIds] = useState({});
  const biographyRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    async function GET_POEPLE() {
      const { data } = await axios.get(`${BASE_URL}/person/${id}?${API_KEY}`);
      setUserDetail(data);

      const movies = await axios.get(
        `${BASE_URL}/person/${id}/movie_credits?${API_KEY}`
      );
      setUserMovies(movies.data.cast);

      const credits = await axios.get(
        `${BASE_URL}/person/${id}/combined_credits?${API_KEY}`
      );
      setUserCredits(credits.data);

      const ids = await axios.get(
        `${BASE_URL}/person/${id}/external_ids?${API_KEY}`
      );
      setExternalIds(ids.data);

      setIsLoading(false);
    }
    GET_POEPLE();
  }, [id]);

  useEffect(() => {
    const checkContentHeight = () => {
      if (biographyRef.current) {
        const height = biographyRef.current.clientHeight;
        setShowToggle(height >= 200);
      } else {
        console.log("Biography element not yet available.");
      }
    };

    // Run the height check after ensuring the content is likely rendered:
    if (userDetail.biography) {
      checkContentHeight();
    }
  }, [userDetail.biography]); // Dependency on the biography content

  const toggleBiography = () => {
    setFadeEffect(true); // Begin with fading effect
    setTimeout(() => {
      setIsBioExpanded((prev) => !prev); // Toggle expanded state after a short delay
      setFadeEffect(false); // Reset fade effect after transition
    }, 250); // Delay should match CSS transition time
  };

  return (
    <>
      <style>
        {`
          .li-after::after {
            content: "";
            width: 12px;
            height: 12px;
            position: absolute;
            bottom: 6px;
            left: -3px;
            border-radius: 50%;
            background-color: #d3b369;
          }
        `}
      </style>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container   w-11/12 sm:w-10/12 md:grid md:grid-cols-5  lg:grid-cols-4 mt-8 flex-col  ">
          <div className=" lg:col-span-1 md:col-span-2  bg-slate-700  rounded pb-3  flex flex-col ">
            <img
              src={`${BASE_IMG}/original/${userDetail.profile_path}`}
              className="w-[260px] h-[400px] rounded flex mx-auto mt-3 md:mt-1"
            />
            <div className="flex justify-center gap-6  text-2xl mt-5  text-white flex-wrap">
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
                  externalIds.twitter_id
                    ? `https://www.twitter.com/${externalIds.twitter_id}`
                    : "#"
                }
                className="hover:text-blue-400"
              >
                <FaTwitter />
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
            <div className="flex flex-col gap-3 px-3">
              <h2 className="text-2xl font-bold mb-1 mt-6">Personal Info</h2>
              <div>
                <p className="font-bold">Known For</p>
                <p className="text-sm">{userDetail.known_for_department}</p>
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <p className="text-sm">
                  {userDetail.gender == "2" ? "Man" : "Woman"}
                </p>
              </div>
              <div>
                <p className="font-bold">Birthday</p>
                <p className="text-sm">{userDetail.birthday}</p>
              </div>
              <div>
                <p className="font-bold">Place of Birth</p>
                <p className="text-sm">{userDetail.place_of_birth}</p>
              </div>
            </div>
          </div>
          <div className=" col-span-3 md:px-7">
            <h1 className="text-2xl font-bold mt-5 md:mt-0 ">
              {userDetail.name}
            </h1>
            {userDetail.biography ? (
              <section>
                <p className="mt-6 mb-2 text-xl text-slate-300 font-bold">
                  Biography
                </p>
                <p
                  ref={biographyRef}
                  className={`text-[14px] leading-7 text-slate-400 transition-opacity  transition-max-height duration-1000 ${
                    !isBioExpanded
                      ? "max-h-[200px] overflow-hidden"
                      : "max-h-[1000px] overflow-visible"
                  } ${fadeEffect ? "opacity-0" : "opacity-100"}`}
                >
                  {userDetail.biography}
                </p>
                {showToggle && (
                  <button
                    className="flex items-center gap-1 justify-center w-full text-slate-300"
                    onClick={toggleBiography}
                  >
                    {!isBioExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    {!isBioExpanded ? "View More" : "View Less"}
                  </button>
                )}
              </section>
            ) : null}

            <section className="border-b border-slate-400 border-opacity-55">
              <p className="mt-6 mb-2 text-xl text-slate-300 font-bold">
                Known For
              </p>
              <div className="flex gap-2  overflow-x-scroll h-40">
                {userMovies
                  .filter((movie) => movie.backdrop_path)
                  .map((movie) => (
                    <div
                      key={movie.id}
                      className="flex flex-col flex-shrink-0  w-[120px] text-center text-sm gap-2"
                    >
                      <img
                        src={`${BASE_IMG}/w300${movie.backdrop_path}`}
                        className="w-full rounded"
                      />
                      <p>{movie.title}</p>
                    </div>
                  ))}
              </div>
            </section>
            <section className="my-8">
              {Object.keys(userCredits)
                .filter((item) => item != "id" && userCredits[item].length > 0)
                .map((key) => (
                  <div>
                    <h1 className="my-5 text-2xl font-bold">{key}</h1>
                    <ul>
                      {userCredits[key]
                        .filter((item) => item.title)
                        .map((res) => (
                          <li className="w-1 py-1 bg-[#d3b369] relative li-after list-none  border-[#f45b68] border-opacity-7">
                            <Link
                              to={`/movies/${res.id}`}
                              className="lg:w-[700px] md:w-[400px] w-[300px] bg-yellow-400 bg-opacity-5  flex flex-col gap-1 p-3 rounded"
                            >
                              <p className="text-[15px]">
                                {res.title}
                                <span className="text-[13px] text-green-600 ">
                                  ({res.release_date.split("-")[0]})
                                </span>
                              </p>
                              {res.character && (
                                <span className="flex gap-1 text-sm text-gray-400">
                                  as
                                  <p className="text-md text-gray-300">
                                    {res.character}
                                  </p>
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Person;
