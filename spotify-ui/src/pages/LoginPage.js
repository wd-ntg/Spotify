
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";
import TextInput from "../components/TextInput";
import { useCookies } from "react-cookie";
import {
  makeUnauthenticatedPOSTRequest,
  makeUnauthenticatedPOSTRequest2,
} from "../utils/serverHelpers";
import PasswordInput from "../components/PasswordInput";
import { GoogleLogin } from "react-google-login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { userName, email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/spotify");
    } else {
      alert("Failure");
    }
  };

  // Login with google

  const clientID =
    "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com";

  const onLoginSucess = async (req, res) => {
    const response = await makeUnauthenticatedPOSTRequest2(
      "/auth/user/google-login",
      {
        name: req.profilObj.givenName, // Liên kết với gg login để lấy dữ liệu
        email: req.profilObj.email,
        userName: req.profilObj.name,
      }
    );
  };

  const onFailureSucess = async (req, res) => {
    console.log("Failure: ", req);
  };

  return (
    <div className="text-center">
      <header className="w-[100%] h-[84px] flex justify-center items-center border-b-2">
        <img className="h-[64px] " src={logoSpotify}></img>
      </header>
      <main className="my-6 justify-center items-center w-[100%]">
        
        <div className="my-2">
          <GoogleLogin
            clientId={clientID}
            render={(renderProps) => (
              <button  className="font-semibold w-[320px] h-[32px] border-2 rounded-2xl hover:border-green-400 hover:scale-95"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}

              >
                <i class="fa-brands fa-google mr-2"></i>Tiếp tục bằng Google
              </button>
            )}
            buttonText="Login"
            onSuccess={onLoginSucess}
            onFailure={onFailureSucess}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="w-[138px] h-[2px] bg-slate-500"></div>
          <div className="mx-2">OR</div>
          <div className="w-[138px] h-[2px] bg-slate-500"></div>
        </div>
        <div className="w-[100%] flex justify-center items-center flex-col">
          <div className="w-[324px] flex">
            <TextInput
              label="Email hoặc tên người dùng"
              placeholder="Nhập Email hoặc tên người dùng"
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="relative w-[324px] flex">
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              setValue={setPassword}
            />
            {/* {
              eye ? <i class="fa-solid fa-eye absolute top-[55%] right-[41%]" onClick={handleClick}></i> : <i class="fa-solid fa-eye-slash absolute top-[55%] right-[41%]" onClick={handleClick}></i>
            }         */}
          </div>
        </div>
        <div className="w-[100%] flex justify-center items-center mt-6">
          <div className="w-[324px] flex items-center">
            <div className="w-[124px] text-left">
              <div className="mb-2">Quên mật khẩu?</div>
              <div className="flex items-center">
                <label>
                  <input type="checkbox"></input>
                  <span class="checkbox"></span>
                </label>
                <span className="ml-2">Hãy nhớ tôi</span>
              </div>
            </div>
            <div className="ml-16 translate-x-1">
              <button
                type="sumbit"
                className="w-[132px] h-[32px] border-2 rounded-2xl hover:border-green-600 bg-green-400"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="w-[138px] h-[2px] bg-slate-500"></div>
          <div className="w-[138px] h-[2px] bg-slate-500"></div>
        </div>
        <div className="mt-4">
          <div className="mb-4">Bạn chưa có tài khoản?</div>
          <Link to="/signup">
            <button className="bg-green-400 rounded-2xl px-8 py-1 hover:border-green-600  hover:border-2">
              Đăng ký Spotify
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
