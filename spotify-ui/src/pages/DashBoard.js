import React, { useContext, useEffect, useState } from "react";

import NavDashboard from "../components/NavDashboard";
import authContext from "../contexts/authContext";

import {
  makeUnauthenticatedPOSTRequestUpload,
  makeUnauthenticatedPOSTRequest2,
} from "../utils/serverHelpers";

function DashBoard() {
  const { currentUser } = useContext(authContext);

  const [value, setValue] = useState(`${currentUser?.userName}`);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");

  const [file, setFile] = useState("")

  const [process, setProcess] = useState(true)

  const [processName, setProcessName] = useState(true)

  // console.log(currentUser)
  // const file = e.target.files[0];
  // setSelectedFile(file);

  const handleFileChange2 = async (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFile(reader.result);
    };
  };

  useEffect (() => {

  }, [currentUser, selectedFile])

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const upload = async (e) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", currentUser.email);
      const request = await makeUnauthenticatedPOSTRequestUpload(
        "/auth/upload_info",
        formData
      );
      if (request) {
        setProcess(false)
      } else {
        setProcess(true)
      }
    }
  };

  const handleChangeName = async (e) => {
    const request = await makeUnauthenticatedPOSTRequest2("/auth/upload_name", {
      email: currentUser.email,
      newName: value
    })
    if (request) {
      setProcessName(false)
    } else {
      setProcessName(true)
    }
  }

  // if (isEditing) {
  //   setProcessName(true)
  // }

  return (
    <div>
      <NavDashboard currentUser={currentUser} />
      <div className="px-40 py-20 flex">
        <div className="">
          <div className="text-3xl font-semibold">Tài khoản</div>
          <div className="flex items-center justify-center text-xl mt-8 leading-6 bg-gray-100 w-[240px] py-2 px-2">
            <div className="mr-4 text-3xl">
              <iconify-icon icon="bx:user"></iconify-icon>
            </div>
            <div>Cài đặt tài khoản</div>
          </div>
        </div>
        <div className="ml-28">
          <header className="text-left">
            <div className="font-semibold text-2xl">Thông tin cá nhân</div>
            <div className="border-b-[2px] border-gray-500 mt-4"></div>
          </header>
          <main>
            <div className="flex justify-center items-center">
              <div className="text-left">
                <div className="font-semibold text-xl mt-4">Tên người dùng</div>
                <input
                  className="w-[560px] px-2 py-1 my-4 outline-none border-b-[1px] border-gray-500"
                  value={isEditing ? value : currentUser?.userName}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  onClick={() => setIsEditing(true)}
                />
                <div>Tên của bạn xuất hiện trên trang cá nhân</div>
              </div>
              <div className="ml-8">
                {processName ? <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-green-400" onClick={handleChangeName}>
                  Lưu
                </button> : <div>Hoàn thành</div>}
                {/* <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-red-400">
                  Hủy
                </button> */}
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-xl mt-4">Avatar</div>
              <div className="flex items-center w-full">
                <div className="flex items-center">
                  <div>
                    Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                  </div>
                  <div>
                    {/* <img
                      className="rounded-full w-[70px] h-[70px] bg-cover ml-6"
                      src={user?.photoURL}
                    /> */}
                    {!selectedFile ? (
                      currentUser ? (
                        <img
                          className="rounded-full w-[70px] h-[70px] bg-cover ml-6"
                          src={require(`./uploads/${currentUser?.avatar}`)}
                          alt="User Avatar"
                        />
                      ) : (
                        <div className="rounded-[50%] ml-6 p-4 border-solid border-gray-400 border-[1px] w-[80px] h-[80px] flex justify-center items-center">
                          <i className="fa-solid fa-user text-5xl"></i>
                        </div>
                      )
                    ) : (
                      <div>
                        <img
                          className="rounded-full w-[70px] h-[70px] bg-cover ml-6"
                          src={file}
                          alt="Selected File"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-10 flex items-center">
                  <input
                    className="hidden mt-4 w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      handleFileChange(e);
                      handleFileChange2(e);
                    }}
                  />
                  <label
                    htmlFor="file"
                    className="flex justify-center items-center mt-4 w-[110px]"
                  >
                    {/* <img src={AddAvatar} className="w-8 h-8 mr-2" alt="" /> */}
                    {!selectedFile ? (
                      <div className="text-indigo-300 flex">
                        Thay đổi Avatar
                      </div>
                    ) : (
                      // <div className="rounded-[50%] ml-6 p-4 border-solid border-gray-400 border-[1px] w-[80px] h-[80px] flex justify-center items-center">
                      <div>
                        <div className="text-purple-400">
                          {selectedFile.name.slice(0, 15)} ...
                        </div>
                      </div>
                      // </div>
                    )}
                  </label>
                  {process ? <div
                    className="mt-4 cursor-pointer ml-4"
                    onClick={(e) => {
                      upload();
                    }}
                  >
                    Upload
                  </div> : <div
                    className="mt-4 cursor-pointer ml-4"
                  >
                    Hoàn thành
                  </div>}
                </div>
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-xl mt-4 mb-2">Email</div>
              <div>{currentUser?.email}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
