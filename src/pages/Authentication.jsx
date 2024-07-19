import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="flex flex-col h-full bg-white relative p-10">
        <button
          className="absolute top-5 right-5 rounded-full border border-blue-500 p-1 hover:bg-blue-100"
          onClick={() => setOpenAuth(false)}
        >
          <Close />
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <p className="text-gray-600 text-center mt-4">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer font-semibold"
                  onClick={() => setLogin(false)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <p className="text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer font-semibold"
                  onClick={() => setLogin(true)}
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Authentication;
