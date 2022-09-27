import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [product, setProduct] = useState("");
  const [memo, setMemo] = useState("");

  const tDeviceObj = {
    location: location,
    unit: unit,
    product: product,
    memo: memo,
  };

  const addTestDevice = () => {
    console.log("등록");
    fetch("http://localhost:3000/api/testdevice/addtdevice", {
      method: "POST",
      body: JSON.stringify(tDeviceObj),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    console.log("등록완료");
  };

  function 장비추가버튼클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setLocation("");
    setUnit("");
    setProduct("");
    setMemo("");
  }

  return (
    <Layout title={"SETTING"}>
      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <button
            className="space-x-1 flex sunmoon_btn"
            onClick={장비추가버튼클릭}
          >
            <span>Add Device</span>
            <span data-comment="플러스 아이콘">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
        <div id="container_add_device" className="space-y-5 hidden">
          <hr></hr>
          <div className="text-3xl font-bold">New Device</div>
          <div className="flex flex-col space-y-3">
            <span>product *</span>
            <input
              type={"text"}
              value={product}
              placeholder={"제품명"}
              onChange={(e) => setProduct(e.currentTarget.value)}
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            ></input>
            <span>Location *</span>
            <input
              type={"text"}
              value={location}
              placeholder={"거실, 안방... etc"}
              onChange={(e) => setLocation(e.currentTarget.value)}
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            ></input>
            <span>unit</span>
            <input
              type={"text"}
              value={unit}
              placeholder={"측정단위"}
              onChange={(e) => setUnit(e.currentTarget.value)}
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            ></input>
            <span>memo</span>
            <input
              type={"text"}
              value={memo}
              placeholder={"메모"}
              onChange={(e) => setMemo(e.currentTarget.value)}
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            ></input>
            <button
              className="w-full rounded-lg py-5 sunmoon_btn"
              onClick={addTestDevice}
            >
              등록
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
