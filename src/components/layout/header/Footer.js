import { Link } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
const Footer = () => {
  return (
    <footer
      className="lg:h-[400px]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(15, 32, 58, 0.3), rgba(0, 0, 0, 0.70)), url('/ft-bg.jpg') ",
      }}
    >
      <div className="container  w-11/12 sm:w-10/12 md:grid-cols-4 items-center md:items-start  grid  lg:grid-cols-7 pt-16 gap-20 text-slate-400">
        <div className="flex flex-col lg:col-span-2 md:col-span-2 ">
          <Link to="/">
            <h1 className=" text-xl lg:text-2xl  lg:mr-12 text-white flex flex-col w-fit">
              <p className="flex">
                Hyper<span className="text-yellow-500">Movies</span>
              </p>
              <p className="flex  text-xs lg:justify-center font-semibold items-center">
                Film Review
              </p>
            </h1>
          </Link>
          <p className="mt-5 lg:mt-16 text-sm ">
            57th Avenue Legnone,Milano, 20158
          </p>
          <p className="mt-6">
            Call us:{" "}
            <span className="text-white text-sm lg:text-xl ">
              (+39) 3884965893
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm col-span-1 ">
          <p className="text-white  lg:mb-10  text-[18px]">Resources</p>
          <span>About</span>
          <span>Contact Us</span>
          <span>Forums</span>
          <span>Blog</span>
          <span>Help Center</span>
        </div>
        <div className="flex flex-col gap-3 text-sm col-span-1">
          <p className="text-white  lg:mb-10   text-[18px]">Legal</p>
          <span>Terms of use</span>
          <span>Privacy Policy </span>
          <span>Security</span>
        </div>
        <div className="flex flex-col gap-3 text-sm col-span-1">
          <p className="text-white lg:mb-10  text-[18px]">Account</p>
          <span>My Account</span>
          <span>WatchList </span>
          <span>Collections</span>
        </div>
        <div className="flex flex-col gap-3 text-sm col-span-2 items-center ">
          <p className="text-white lg:mb-10   text-[18px]">Newsletter</p>
          <p className="text-center">
            Subscribe to our newsletter system now to get latest news from us.
          </p>
          <div className="mt-2 w-full  text-[12px]  flex border-slate-400 border-opacity-50 border justify-between items-center rounded p-2">
            <input placeholder="Enter your Email" className="bg-transparent " />
            <IoMailOutline />
          </div>
          <p className="text-red-800 font-bold mt-3 mb-10">Subscribe now </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
