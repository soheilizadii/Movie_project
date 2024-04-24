import { Link } from "react-router-dom";
import { BASE_IMG } from "../../config/api-config";

const Person = ({ result, setSearchResult, setQuery }) => {
  const clickHandler = () => {
    setSearchResult([]);
    setQuery(null);
  };
  return (
    <>
      {result
        .filter((k) => k.profile_path)
        .map((item) => (
          <Link to={`people/${item.id}`} onClick={clickHandler}>
            <li
              key={item.id}
              className="flex gap-2 items-center py-2 text-slate-300 border-b border-slate-400 border-opacity-55 "
            >
              <img
                className="rounded-full h-[45px] w-[45px]  object-cover"
                src={
                  item.profile_path
                    ? `${BASE_IMG}/w92/${item.profile_path}`
                    : `/no_profile.jpg`
                }
              />
              <span>{item.name}</span>
              {item.known_for_department && (
                <span className=" bg-slate-700 px-2 py-1 rounded-full text-[12px]  ">
                  {item.known_for_department}
                </span>
              )}
            </li>
          </Link>
        ))}
    </>
  );
};

export default Person;
