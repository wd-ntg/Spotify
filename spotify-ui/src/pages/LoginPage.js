// import React from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import video from "../assest/image/pexels-pressmaster-3196427-3840x2160-25fps.mp4";
// import { firebaseAuth } from "../utils/firebase-config";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword
// } from "firebase/auth";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });
//   const handleLogin = async () => {
//     try {
//       const { email, password } = formValues;
//       await signInWithEmailAndPassword(firebaseAuth, email, password);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) navigate("/");
//   });
//   return (
//     <div showPassword={showPassword}>
//       <video
//         src={video}
//         muted
//         loop
//         autoPlay
//         className="fixed top-0 bottom-0 right-0 left-0 object-cover bg-cover z-[-1]"
//       ></video>
//       <nav className="h-8 flex justify-between p-12 items-center text-teal-50 mx-6">
//         <div className="flex">
//           <i class="fa-brands fa-spotify text-3xl text-green-500"></i>
//           <span className="text-2xl ml-2">Spotify</span>
//         </div>
//         <ul className="flex font-semibold">
//           <li className="mx-4 cursor-pointer hover:text-green-300">
//             <Link to="/spotify">Trải nghiệm</Link>
//           </li>
//           <li className="mx-4 cursor-pointer hover:text-green-300">Download</li>
//         </ul>
//       </nav>
//       <main className="text-white flex justify-center items-center flex-col h-[420px]">
//         <header className="text-center mb-4 text-shadow">
//           <div className="text-3xl font-semibold">
//             Âm nhạc là nguồn cảm hứng vô tận{" "}
//           </div>
//           <div className="text-3xl font-semibold">
//             Tận hưởng những giai điệu tuyệt vời trên Spotify
//           </div>
//         </header>
//         <div className="mb-2 font-semibold">
//           <span>Âm nhạc tại đầu ngón tay - </span>
//           <span>Chạm đến âm nhạc, </span>
//           <span>chạm đến cảm xúc</span>
//         </div>
//         <div className="mb-4">
//           <span className="text-sm">
//             Bạn đã có tài khoản, hãy đăng nhập vào bên dưới. Nếu không, vui lòng
//             {"  "}
//           </span>
//           <span className="hover:text-green-500">
//             <Link to="/signup">Đăng ký</Link>
//           </span>
//         </div>
//         <form>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//             value={formValues.email}
//             onChange={(e) => {
//               setFormValues({ ...formValues, [e.target.name]: e.target.value });
//             }}
//           ></input>
//           {showPassword && (
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500   "
//               value={formValues.password}
//               onChange={(e) => {
//                 setFormValues({
//                   ...formValues,
//                   [e.target.name]: e.target.value,
//                 });
//               }}
//             ></input>
//           )}
//           {!showPassword && (
//             <button
//               onClick={() => setShowPassword(true)}
//               type="sumbit"
//               className="ml-4 hover:text-green-500"
//             >
//               Get Started
//             </button>
//           )}
//         </form>
//         <button onClick={handleLogin} className="hover:text-green-500 mt-4">
//           Login
//         </button>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";
import TextInput from "../components/TextInput";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage() {
  // const [password, setPassword] = useState(false)
  // const [eye, setEye] = useState(false)
  // const handlePassword = () => {
  //   setPassword(!password)
  // }
  // const handleSetEye = () => {
  //   setEye(!eye)
  // }
  // const handleClick = () => {
  //   handlePassword();
  //   handleSetEye()
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { userName, email, password };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/login",
      data
    );
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
  return (
    <div className="text-center">
      <header className="w-[100%] h-[84px] flex justify-center items-center border-b-2">
        <img className="h-[64px] " src={logoSpotify}></img>
      </header>
      <main className="my-6 justify-center items-center w-[100%]">
        <div className="my-2">
          <button className="font-semibold bg-sky-600 w-[320px] h-[32px] rounded-2xl text-white hover:border-2 hover:border-green-400 hover:scale-95">
            <i class="fa-brands fa-facebook mr-2"></i>Tiếp tục bằng Facebook
          </button>
        </div>
        <div className="my-2">
          <button className="font-semibold bg-black w-[320px] h-[32px] rounded-2xl  text-white hover:border-green-400 hover:scale-95">
            <i class="fa-brands fa-apple mr-2"></i>Tiếp tục bằng Apple
          </button>
        </div>
        <div className="my-2">
          <button className="font-semibold w-[320px] h-[32px] border-2 rounded-2xl hover:border-green-400 hover:scale-95">
            <i class="fa-brands fa-google mr-2"></i>Tiếp tục bằng Google
          </button>
        </div>
        <div className="my-2">
          <button className="font-semibold w-[320px] h-[32px] border-2 rounded-2xl hover:border-green-400 hover:scale-95">
            Tiếp tục bằng Số Điện Thoại
          </button>
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
                  login()
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


