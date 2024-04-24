import { useContext, useState } from "react";
import { RxFace, RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../../context/UserProvider";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const TopHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(userContext);
  const menuItems = [
    {
      path: "/movies/page/1",
      title: "movies",
    },
    {
      path: "/tv/page/1",
      title: "tv show",
    },
    {
      path: "/people/page/1",
      title: "people",
    },
  ];
  const activeClass = ({ isActive }) => {
    return isActive ? "text-yellow-500" : "hover:text-white";
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to Logout .",
      buttons: [
        {
          label: "Yes",
          onClick: () => logout(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <section className="flex p-6 items-center text-slate-300 justify-between">
        <Link to="/">
          <h1 className="text-2xl mr-8 lg:mr-12">
            Hyper<span className="text-yellow-500">Movies</span>
            <p className="flex  text-xs justify-center font-semibold">
              Film Review
            </p>
          </h1>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-4 lg:gap-6 uppercase text-xs lg:text-sm  ">
            {menuItems.map((item) => (
              <li key={item.title}>
                <NavLink to={item.path} className={activeClass}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {user ? (
          <div className="flex gap-2 ml-auto">
            <span>{user.username}</span>
            <button className="text-rose-500" onClick={submit}>
              Logout
            </button>
          </div>
        ) : (
          <div className=" gap-4 ml-auto hidden md:flex  text-sm items-center">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/login">
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-2xl text-white">
                Sign up
              </button>
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <RxHamburgerMenu />
          </div>
        </div>
      </section>
      <div
        className={`md:hidden -m-4  bg-slate-900 text-slate-300 absolute w-full z-10 text-sm transition-all duration-700  ${
          isOpen ? ` overflow-auto ` : ` overflow-hidden p-0`
        } `}
        style={{ height: isOpen ? "165px" : "0px" }}
      >
        <ul className=" flex flex-col items-center gap-4  py-2 ">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={activeClass}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="border-slate-800 border-t py-2 flex justify-center gap-3 items-center ">
          <Link to='/login'>Sign Up</Link>
          <Link to='/login' className="bg-rose-700 py-1.5 px-3 rounded-2xl text-white">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
