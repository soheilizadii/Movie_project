import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { API_KEY, BASE_IMG, BASE_URL } from "../config/api-config";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [pages, setPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const timeOut = setTimeout(() => {
      async function GET_PEOPLE() {
        const { data } = await axios.get(
          `${BASE_URL}/trending/person/day?${API_KEY}&page=${page}`
        );
        setPeople(data.results);
        setPages(data.total_pages);
      }
      GET_PEOPLE();
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [page]);
  return !isLoading ? (
    <div className="container  w-11/12 sm:w-10/12 ">
      <h1 className="my-12  text-2xl justify-center ml-6">Popular People</h1>
      <section className="flex gap-4 flex-wrap justify-center  ">
        {people &&
          people.map((item) => {
            return (
              <Link
                to={`/people/${item.id}`}
                className="bg-slate-700 w-[100%] sm:w-[30%] md:w-[22%] lg:w-[18%] rounded-xl  border-4 transition-all  border-slate-700 duration-500 hover:scale-110"
              >
                <img
                  src={
                    item.profile_path
                      ? `${BASE_IMG}/original/${item.profile_path}`
                      : `/no_profile.png`
                  }
                  className="w-full h-[200px] rounded-tl-lg rounded-tr-lg "
                />
                <h1 className="text-slate-300 py-2 flex justify-center text-lg ">
                  {item.name}
                </h1>
                <div className="flex flex-wrap overflow-hidden justify-center items-center text-[13px] text-center leading-6 pb-2  text-slate-400">
                  {item.known_for.map((movie) => movie.title).join(",")}
                </div>
              </Link>
            );
          })}
      </section>
      <Pagination
        page={Number(page)}
        activePage={activePage}
        setActivePage={setActivePage}
        type="people"
      />
    </div>
  ) : (
    <Loading />
  );
};

export default PersonList;
