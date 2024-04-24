import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_KEY, BASE_IMG, BASE_URL } from "../config/api-config";
const MovieCard = ({ detail, type }) => {
  const [formatVote, setFormatVote] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [keyTrailer, setKeyTrailer] = useState(null);
  console.log(keyTrailer);
  console.log(showTrailer);
  useEffect(() => {
    const voteString = String(detail.vote_average);

    if (voteString.includes(".") && voteString.split(".")[1].length > 0) {
      const newVote = voteString.split(".");
      const firstDecimalDigit = newVote[1][0];
      const formattedVote = `${newVote[0]}.${firstDecimalDigit}`;
      setFormatVote(formattedVote);
    } else {
      setFormatVote(detail.vote_average);
    }
  }, [detail]);

  useEffect(() => {
    setTimeout(() => {
      if (showTrailer) {
        async function GET_TRAILER() {
          const { data } = await axios.get(
            `${BASE_URL}/movie/${detail.id}/videos?${API_KEY}`
          );
          setKeyTrailer(data.results[0].key);
        }
        GET_TRAILER();
      }
    }, 2000);
  }, [showTrailer]);
  return (
    <Link
      to={type === "tv" ? `/tv/${detail.id}` : `/movies/${detail.id}`}
      // onMouseOver={() => setShowTrailer(true)}
      // onMouseOut={() => setShowTrailer(false)}
    >
      <div className="aspect-[2/3] rounded-md relative flex justify-center ">
        <img
          src={`${BASE_IMG}/w780${detail.backdrop_path}`}
          className="rounded-md w-full object-cover h-full"
        />
        <div
          className="absolute  w-full  h-full flex flex-col items-center justify-end pb-4 gap-2 
       bg-gradient-to-b from-[#0f172a3c] to-[#0f172a81] hover:from-[#0f172a49] hover:to-[#0f172ac3]"
        >
          <h3 className="text-md flex text-center  ">
            {detail.title || detail.name}
          </h3>
          <div className="flex gap-1 items-center">
            <span className="text-md text-yellow-600">
              <FaStar />
            </span>
            <span>{formatVote && formatVote}/10</span>
          </div>
        </div>
        {showTrailer && (
          <iframe
            className="absolute w-full h-full "
            src={`https://www.youtube.com/embed/${keyTrailer}?autoplay=1&modestbranding=1&controls=0&rel=0&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
