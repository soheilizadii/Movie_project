import { useContext, useState } from "react";
import { userContext } from "../context/UserProvider";

const Login = () => {
  const { login } = useContext(userContext);

  const [values, setValues] = useState({
    username: "soheilizadi",
    password: "Mehr4545",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    login(values.username, values.password);
  };
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center my-16 ">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4  w-[350px] text-sm text-black"
      >
        <input
          type="text"
          value="soheilizadi"
          name="username"
          placeholder="Username"
          className="p-2 rounded"
          onChange={changeHandler}
          disabled 
        />
        <input
          type="text"
          // value={values.password}
          value="Mehr4545"
          name="password"
          placeholder="Password"
          className="p-2 rounded"
          onChange={changeHandler}
          disabled 
        />
        <button className="bg-green-500 rounded py-2 text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
