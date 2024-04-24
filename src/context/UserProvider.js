import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../config/api-config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const userContext = createContext();
const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState(() =>
    localStorage.getItem("userSession")
  );
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (sessionUser) {
      async function GetUser() {
        const { data } = await axios.get(
          `${BASE_URL}/account?${API_KEY}&session_id=${sessionUser}`
        );
        setUser(data);
      }
      GetUser();
    }
  }, [sessionUser]);
  const login = async (username, password) => {
    try {
      const TokenResult = await axios.get(
        `${BASE_URL}/authentication/token/new?${API_KEY} `
      );
      const validateCredentials = await axios.post(
        `${BASE_URL}/authentication/token/validate_with_login?${API_KEY}`,
        {
          username,
          password,
          request_token: TokenResult.data.request_token,
        }
      );
      const session = await axios.post(
        `${BASE_URL}/authentication/session/new?${API_KEY}`,
        { request_token: TokenResult.data.request_token }
      );
      setSessionUser(session.data.session_id);
      localStorage.setItem("userSession", session.data.session_id);
      navigate("/", { replace: true });
      toast.success("You Successfully Login !");
    } catch {
      toast.error("Username and Password is not valid");
    }
  };

  const logout = () => {
    setSessionUser(null);
    localStorage.removeItem("userSession", sessionUser);
    setUser(null);
    toast.success("You Successfully Logout !");
  };

  return (
    <userContext.Provider value={{ login, user, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
