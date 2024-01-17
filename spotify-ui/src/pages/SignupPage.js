
import React, { useEffect } from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom"
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase-config";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"])
  const navigate = useNavigate()

  const singup = async () => {
    if (password != confirmPassword) {
      alert("You confirm password fields must match. Please check again!");
      return;
    }
    const data = { firstName, lastName, userName, email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data)
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30)
      setCookie("token", token, {path: "/", expires:date})
      navigate("/spotify")
    } else {
      alert("Failure")
    }
  };

  const googleProvider = new GoogleAuthProvider();


  const GoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (result) {
        const data = {
          firstName: result._tokenResponse.firstName,
          lastName: " ",
          userName: result._tokenResponse.fullName,
          email: result._tokenResponse.email,
          password: " ",
        };
        const response = await makeUnauthenticatedPOSTRequest(
          "/auth/register",
          data
        );
        if (response && !response.err) {
          const token = response.token;
          const date = new Date();
          date.setDate(date.getDate() + 30);
          setCookie("token", token, { path: "/", expires: date });
          navigate("/spotify");
        }
      }
    } catch (err) {
      console.error("Error during Google login:", err);
    }
  };

  return (
    <div>
      <header className="w-[100%] h-[84px] flex justify-center items-center border-b-2">
        <img className="h-[64px]" src={logoSpotify}></img>{" "}
      </header>
      <main className="flex justify-center items-center flex-col mt-4">
        <div>
          <span className="font-semibold text-lg">Đăng ký miễn phí để bắt đầu phát nhạc</span>
        </div>

        <div
          className="my-2"
          onClick={() => {
            GoogleRegister();
          }}
        >
          <button
            className="w-[320px] h-[32px] border-2 rounded-2xl hover:border-green-400 hover:scale-95"
            // onClick={renderProps.onClick}
            // disabled={renderProps.disabled}
          >
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center mr-2">
                <iconify-icon icon="flat-color-icons:google"></iconify-icon>
              </div>
              <div>Tiếp tục bằng Google</div>
            </div>
          </button>
          {/* <GoogleLogin
            clientId={clientID}
            render={(renderProps) => (
            )}
            buttonText="Login"
            onSuccess={onLoginSucess}
            onFailure={onFailureSucess}
            cookiePolicy={"single_host_origin"}
          /> */}
        </div>
        <div className="w-[324px]">
          <TextInput
            label="Email"
            placeholder="Nhập Email"
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className="w-[324px]">
          <TextInput
            label="Tên người dùng"
            placeholder="Nhập tên người dùng"
            value={userName}
            setValue={setUserName}
          />
        </div>
        <div className="w-[324px]">
          <PasswordInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="w-[324px]">
          <PasswordInput
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
        <div className="w-[324px] flex">
          <div className="w-[162px]">
            <TextInput
              label="Nhập họ"
              placeholder="Nhập họ"
              value={firstName}
              setValue={setFirstName}
            />
          </div>
          <div className="w-[154px] ml-2">
            <TextInput
              label="Nhập tên"
              placeholder="Nhập tên"
              value={lastName}
              setValue={setLastName}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-green-400 rounded-2xl px-8 py-1 hover:border-green-600  hover:border-2 mt-8"
            onClick={(e) => {
              e.preventDefault();
              singup();
            }}
          >
            Đăng ký Spotify
          </button>
        </div>
      </main>
    </div>
  );
}
