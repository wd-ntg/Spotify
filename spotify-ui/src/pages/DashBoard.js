import React, { useContext, useState } from "react";

import NavDashboard from "../components/NavDashboard";
import authContext from "../contexts/authContext";

function DashBoard() {
    const {currentUser} = useContext(authContext)

    const [value, setValue] = useState(`${currentUser?.userName}`);

    const [isEditing, setIsEditing] = useState(false);

    console.log(currentUser)

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
                <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-green-400">
                  Lưu
                </button>
                <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-red-400">
                  Hủy
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-xl mt-4">Avatar</div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <div>
                    Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                  </div>
                  <div>
                    {/* <img
                      className="rounded-full w-[70px] h-[70px] bg-cover ml-6"
                      src={user?.photoURL}
                    /> */}
                    <div className="rounded-[100%] text-6xl ml-6 border-solid border-gray-400 border-[1px]">
                    <iconify-icon icon="mdi:user"></iconify-icon>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-green-400 ml-28">
                    Chỉnh sửa
                  </button>
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
