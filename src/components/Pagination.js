import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Pagination = ({ page, setActivePage, type }) => {
  const navigate = useNavigate();
  function goToPage(page) {
    switch (type) {
      case "people":
        navigate(`/people/page/${page}`);
        break; // Prevents fall-through
      case "tv":
        navigate(`/tv/page/${page}`);
        break; // Prevents fall-through
      case "movie":
        navigate(`/movies/page/${page}`);
        break; // Prevents fall-through
      default:
        // Optionally handle any cases that are not expected
        console.log("Unrecognized type");
    }
  }
  return (
    <div className="flex my-10 gap-3  justify-center items-center text-[16px] text-slate-300">
      <button
        className={
          page > 1 ? ` text[20px]` : `text-slate-700 cursor-auto text-[20px]`
        }
      >
        {" "}
        <FaAngleLeft onClick={() => (page > 1 ? goToPage(page - 1) : null)} />
      </button>
      {(page > 3
        ? [page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3]
        : [1, 2, 3, 4, 5, 6, 7]
      ).map((item) => (
        <button
          className={
            item === page
              ? `bg-slate-300 text-slate-800 px-2 rounded-full flex items-center text-[18px] `
              : null
          }
          onClick={() => goToPage(item)}
        >
          {item}
        </button>
      ))}
      <button className="text-[20px]">
        <FaAngleRight onClick={() => goToPage(page + 1)} />
      </button>
    </div>
  );
};

export default Pagination;
