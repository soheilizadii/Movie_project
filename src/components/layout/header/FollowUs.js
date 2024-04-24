import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
const FollowUs = () => {
  return (
    <div className="flex gap-2 items-start justify-end mt-10 pr-2">
      <p className="uppercase font-bold text-sm">Follow Us :</p>
      <button className="hover:text-yellow-500">
        <FaFacebookF />
      </button>
      <button className="hover:text-blue-400">
        <FaTwitter />
      </button>
      <button className="hover:text-red-600">
        <FaGooglePlusG />
      </button>
      <button className="hover:text-green-500">
        <FaYoutube />
      </button>
    </div>
  );
};

export default FollowUs;
