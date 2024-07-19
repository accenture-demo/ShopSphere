import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccessfull } from "../redux/reducers/userSlice";
import { opensnackBar } from "../redux/reducers/snackBarSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userDefined, setUserDefined] = useState();

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        dispatch(loginSuccessfull(res.data));
        dispatch(
          opensnackBar({
            message: "Login Successful",
            severity: "success",
          })
        );
        setUserDefined(1);
        navigate("/");
      } catch (err) {
        setButtonLoading(false);
        setButtonDisabled(false);

        const errorMessage = err.response?.data?.message || err.message;
        dispatch(
          opensnackBar({
            message: errorMessage,
            severity: "error",
          })
        );
      }
    }

    setButtonDisabled(false);
    setButtonLoading(false);
  };

  useEffect(() => {
    if (userDefined === 1) {
      window.location.replace("/");
    }
  }, [userDefined]);

  return (
    <div className="w-full max-w-md flex flex-col gap-9">
      <div>
        <h1 className="text-3xl font-bold text-blue-600">Login Now ... </h1>
        <p className="text-lg font-normal text-gray-600">Please login with your details here</p>
      </div>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`bg-blue-500 py-3 text-white rounded-md hover:bg-blue-400 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSignIn}
          disabled={buttonDisabled}
        >
          {buttonLoading ? 'Loading...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
