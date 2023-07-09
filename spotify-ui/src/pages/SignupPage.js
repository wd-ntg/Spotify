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

// export default function Sotify() {
//   const navigate = useNavigate();
//   const [showLogin, setShowLogin] = useState(true);
//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });
//   const handleChangeLogin = () => {
//     setShowLogin(true);
//   };
//   const handleChangeSignup = () => {
//     setShowLogin(false);
//   };
//   const handleSignup = async () => {
//     try {
//       const { email, password } = formValues;
//       await createUserWithEmailAndPassword(firebaseAuth, email, password);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) navigate("/");
//   });
//   return (
//     <div showLogin={showLogin}>
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
//             <Link to="/homepage">Trải nghiệm</Link>
//           </li>
//           <li className="mx-4 cursor-pointer hover:text-green-300">Download</li>
//         </ul>
//       </nav>
//       <main className="text-white flex justify-center items-center flex-col h-[360px]">
//         <header className="text-center mb-4 text-shadow">
//           <div className="text-3xl font-semibold">Hoàn thành đăng nhập </div>
//           <div className="text-3xl font-semibold">
//             Cùng tận hưởng những giai điệu tuyệt vời trên Spotify
//           </div>
//         </header>
//         <div>
//           {showLogin && (
//             <form>
//               <span>Sign Up</span>
//               <input
//                 type="text"
//                 name="fullname"
//                 placeholder="Enter your full name"
//                 required
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//               />
//               <input
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 required
//                 value={formValues.email}
//                 onChange={(e) => {
//                   setFormValues({
//                     ...formValues,
//                     [e.target.name]: e.target.value,
//                   });
//                 }}
//               />
//               <input
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 required
//                 value={formValues.password}
//                 onChange={(e) => {
//                   setFormValues({
//                     ...formValues,
//                     [e.target.name]: e.target.value,
//                   });
//                 }}
//               />
//               <input
//                 type="password"
//                 name="passwrodconfirm"
//                 placeholder="Confirm password"
//                 required
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//               />
//               <span></span>

//               <div>
//                 <input id="okayToEmail-signup" type="checkbox" />
//                 <label for="okayToEmail-signup"> I agree to all terms </label>
//                 <span></span>
//               </div>
//               <button
//                 onClick={handleSignup}
//                 type="sumbit"
//                 className="ml-4 hover:text-green-500"
//               >
//                 Sign up
//               </button>
//               <div>
//                 <label for="">You are have account?</label>
//                 <button onClick={handleChangeSignup}>Log in</button>
//               </div>
//             </form>
//           )}
//           {!showLogin && (
//             <form className="">
//               <span>Log in</span>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500"
//                 value={formValues.email}
//                 onChange={(e) => {
//                   setFormValues({
//                     ...formValues,
//                     [e.target.name]: e.target.value,
//                   });
//                 }}
//               ></input>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 className="placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300  shadow-sm focus:outline-none focus:border-t-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm px-2 text-teal-500   "
//                 value={formValues.password}
//                 onChange={(e) => {
//                   setFormValues({
//                     ...formValues,
//                     [e.target.name]: e.target.value,
//                   });
//                 }}
//               ></input>

//               <button onClick={handleSignup}>Log in</button>
//               <div>
//                 <label for="">Do not have an account?</label>
//                 <button onClick={handleChangeLogin}>Sign up</button>
//               </div>
//             </form>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";
// import TextInput from "../components/TextInput";

// export default function SignupPage() {
//   const [password, setPassword] = useState(false);
//   const [eye, setEye] = useState(false);
//   const handlePassword = () => {
//     setPassword(!password);
//   };
//   const handleSetEye = () => {
//     setEye(!eye);
//   };
//   const handleClick = () => {
//     handlePassword();
//     handleSetEye();
//   };
//   const [checkPassword, setCheckPassword] = useState("");
//   const [checkConfirmPassword, setCheckConfirmPassword] = useState("");
//   const [passwordsMatch, setPasswordsMatch] = useState(false);

//   useEffect(() => {
//     if (checkPassword === checkConfirmPassword) {
//       setPasswordsMatch(true);
//     } else {
//       setPasswordsMatch(false);
//     }
//   }, [checkPassword, checkConfirmPassword]);

//   return (
//     <div className="overflow-y-hidden">
//       <header className="w-[100%] h-[84px] flex justify-center items-center border-b-2">
//         <img className="h-[64px]" src={logoSpotify}></img>
//       </header>
//       <main className="my-2 justify-center items-center">
//         <div>
//           <span>Đăng ký miễn phí để bắt đầu phát nhạc</span>
//         </div>
//         <div className="my-6">
//           <div className="flex justify-center flex-col items-center">
//             <label className="w-[324px] flex text-left mb-2">
//               Email
//             </label>
//             <input
//               className="w-[324px] h-[48px] border-2 border-stone-600 rounded-md p-2 focus:outline-green-400"
//               placeholder="Nhập email"
//               type="email"
//               required
//             ></input>
//           </div>
//           <div className="flex justify-center flex-col items-center mt-4">
//             <label className="w-[324px] flex text-left mb-2">
//               Tên người dùng
//             </label>
//             <input
//               className="w-[324px] h-[48px] border-2 border-stone-600 rounded-md p-2 focus:outline-green-400"
//               placeholder="Nhập tên người dùng"
//               type="email"
//               required
//             ></input>
//           </div>
//           <div className="flex justify-center flex-col items-center mt-4">
//             <label className="w-[324px] flex text-left mb-2">
//               Nhập mật khẩu
//             </label>
//             <input
//               className="w-[324px] h-[48px] border-2 border-stone-600 rounded-md p-2 focus:outline-green-400"
//               placeholder="Nhập mật khẩu"
//               type={password ? "text" : "password"}
//               value={checkPassword}
//               onChange={(e) => setCheckPassword(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div className="flex justify-center flex-col items-center  mt-4">
//             <label className="w-[324px] flex text-left mb-2">
//               Xác nhận lại mật khẩu
//             </label>
//             <input
//               className={`w-[324px] h-[48px] border-2 ${passwordsMatch ? "border-stone-600" : "border-red-400"} rounded-md p-2 focus:outline-green-400`}
//               placeholder="Xác nhận lại mật khẩu"
//               value={checkConfirmPassword}
//               onChange={(e) => setCheckConfirmPassword(e.target.value)}
//               type={password ? "text" : "password"}
//               required
//             ></input>
//             {passwordsMatch ? (<span></span>) : (<span className='text-red-500 text-sm'>Mật khẩu xác nhận không đúng</span>)}
//           </div>
//           <div className="flex justify-center items-center mt-4">
//             <div className="w-[158px] mr-1">
//               <label className="w-[158px] text-left mb-2" for='firstName'>Nhập họ</label>
//               <input className="border-2 w-[158px] border-stone-600 rounded-lg float-left p-1 focus:outline-green-400" name="firstName" placeholder="Nhập họ"></input>
//             </div>
//             <div className="w-[158px]">
//               <label className="w-[158px] text-left mb-2">Nhập tên</label>
//               <input className="border-2 w-[158px] border-stone-600 rounded-lg float-left p-1 focus:outline-green-400"  placeholder="Nhập tên"></input>
//             </div>
//           </div>
//           <div className="relative mt-6 justify-center items-center translate-x-[-16px]">
//             {eye ? (
//               <i
//                 class="fa-solid fa-eye absolute top-[20%] left-[58%]"
//                 onClick={handleClick}
//               ></i>
//             ) : (
//               <i
//                 class="fa-solid fa-eye-slash absolute top-[20%] left-[58%]"
//                 onClick={handleClick}
//               ></i>
//             )}
//             <div>Xem mật khẩu / Ẩn mật khẩu</div>
//           </div>
//         </div>
//         <div className="mt-4">
//           <button className="bg-green-400 rounded-2xl px-8 py-1 hover:border-green-600  hover:border-2">
//             Đăng ký Spotify
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom"
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

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
      alert("Success")
      navigate("/spotify")
    } else {
      alert("Failure")
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
