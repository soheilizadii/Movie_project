import { BASE_IMG } from "../../config/api-config";

const Tv = ({ result }) => {
  console.log(result);
  return (
    <>
      {result
        .filter((k) => k.poster_path)
        .map((item) => (
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
            <span>{item.name}</span>
          </li>
        ))}
    </>
  );
};

export default Tv;
