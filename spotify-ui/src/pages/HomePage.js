import "../App.css";
import Songs from "../Context";
import DataSongs from "../data/songs.json";
import { useContext, useState, useEffect } from "react";

export default function HomePage() {
  return (
    <div className="flex w-full">
      <div className="w-[20%] py-2">
        <div className="header bg-stone-400 mb-2 p-2 rounded-[8px]">
          <div className="header_home flex p-1 rounded-6">
            <i class="fa-solid fa-house flex  leading-6"></i>
            <span className="font-semibold ml-4">Trang chủ</span>
          </div>
          <div className="header_search flex p-1">
            <i class="fa-solid fa-magnifying-glass flex leading-6"></i>
            <span className="ml-4">Tìm kiếm</span>
          </div>
        </div>
        <main className="bg-stone-400 mb-2 text-left leading-6 px-4 py-10 rounded-[8px]">
          <header className="p-4 flex">
            <i class="fa-solid fa-book leading-6"></i>
            <span className="ml-2">Thư viện</span>
            <aside className="translate-x-[112px] h-8 leading-8 flex justify-center items-center ">
              <i class="fa-light fa-plus leading-6 mr-6 text-3xl flex h-[100%]"></i>
              <i class="fa-solid fa-arrow-right leading-6 text-xl flex h-[100%]"></i>
            </aside>
          </header>
          <div className="pb-4 bg-neutral-600 mt-2 p-4 rounded-[8px]">
            <span className="font-semibold">
              Tạo danh sách phát đầu tiên của bạn
            </span>
            <br />
            <span className="text-sm">Rất dễ! Chúng tôi sẽ giúp bạn</span>
            <br />
            <button className="border-solid border-2 rounded-[12px] mt-4 px-3">
              Tạo danh sách phát
            </button>
          </div>
          <div className="bg-neutral-600 mt-6 p-4 rounded-[8px]">
            <span>Hãy cùng theo dõi một số</span>
            <br />
            <span>Podcast</span>
            <br />
            <span className="text-sm">
              Chúng tôi sẽ cập nhật thông tin cho bạn về các tập mới
            </span>
            <br />
            <button className="border-solid border-2 rounded-[12px] mt-4 px-3">
              Duyệt xem podcast
            </button>
          </div>

          <footer className="mt-6">
            <span className="text-sm">Cookie</span>
            <br />
            <button className="mt-8 border-solid border-slate-100 border-[1px] rounded-xl px-[8px]">
              <i class="fa-solid fa-globe mr-1"></i>
              Tiếng Việt
            </button>
          </footer>
        </main>
      </div>
      <div className="w-[80%] py-2 px-4">
        <nav className="flex w-full bg-zinc-600 relative items-center px-2 py-3 rounded-md mb-1">
          <div className="nav_left">
            <i class="fa-solid fa-chevron-left text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-not-allowed mr-4"></i>
            <i class="fa-solid fa-chevron-right text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-not-allowed"></i>
          </div>
          <div className="nav_right float-right absolute right-0 mr-8">
            <button className="font-semibold text-slate-500 hover:scale-110 hover:text-slate-100 mr-6">
              Đăng ký
            </button>
            <button className="font-semibold border-solid border-[1px] bg-white rounded-xl px-2 hover:scale-110">
              Đăng nhập
            </button>
          </div>
        </nav>
        <div className="w-full">
          <div className="text-left">
            <PlayListView title="Top Treading" />
          </div>
          <div className="flex justify-between px-8">
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left">
            <PlayListView title="Dành cho bạn" />
          </div>
          <div className="flex justify-between px-8">
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
            <Card
              title="Alan"
              description="Hello"
              url="https://images.pexels.com/photos/17284329/pexels-photo-17284329/free-photo-of-l-nh-tuy-t-binh-minh-phong-c-nh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const PlayListView = ({ title }) => {
  return (
    <div className="mt-4 mx-2 mb-4">
      <header>
        <span className="text-xl font-semibold ">{title}</span>
      </header>
    </div>
  );
};

const Card = ({ title, description, url }) => {
  return (
    <div className="px-4 py-2 rounded-md bg-black bg-opacity-60 w-1/6">
      <div className="">
        <img
          className="w-full rounded-sm h-[199px] py-4"
          alt="label"
          src={url}
        />
      </div>
      <div className="text-white text-sm font-semibold text-left">{title}</div>
      <div className="text-gray-600 text-sm text-left">{description}</div>
    </div>
  );
};
