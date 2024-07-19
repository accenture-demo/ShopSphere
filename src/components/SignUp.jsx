import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccessfull } from "../redux/reducers/userSlice";
import { opensnackBar } from "../redux/reducers/snackBarSlice.js";

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await UserSignUp({ name, email, password });
        dispatch(loginSuccessfull(res.data));
        window.location.replace("/") ;
        dispatch(
          opensnackBar({
            message: "err.response.data.message",
            severity: "error",
          })
        );
        setOpenAuth(false);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
          dispatch(
            opensnackBar({
              message: err.response.data.message,
              severity: "error",
            })
          );
        } else {
          alert(err.message);
          dispatch(
            opensnackBar({
              message: err.message,
              severity: "error",
            })
          );
        }
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Create New Account </h1>
        <p className="text-lg text-text_secondary">Please enter details to create a new account</p>
      </div>
      <div className="space-y-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
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
        <button className="bg-blue-500 py-3 px-10 w-full text-center text-white rounded-md hover:bg-blue-300"
          onClick={handleSignUp}
          isDisabled={buttonDisabled}
            >signUp</button>
      </div>
    </div>
  );
};

export default SignUp;
