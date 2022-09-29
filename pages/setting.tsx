import { testDevice } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");
  const [memo, setMemo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sDevice, setSDevice] = useState<testDevice[]>([]);

  // 서버에 싣어서 보낼 데이터
  const tDeviceObj = {
    product: product,
    location: location,
    unit: unit,
    type: type,
    memo: memo,
  };

  const addTestDevice = () => {
    // 입력폼에 데이터가 있는지?

    if (!product) {
      setErrorMsg("제품명을 입력하여 주세요.");
      return;
    }
    if (!location) {
      setErrorMsg("설치위치를 입력하여 주세요.");
      return;
    }
    if (!type) {
      setErrorMsg("장치종류를 입력하여 주세요.");
      return;
    }
    if (!unit) {
      setErrorMsg("단위을 입력하여 주세요.");
      return;
    }

    setErrorMsg("");

    fetch("http://localhost:3000/api/testdevice/addtdevice", {
      method: "POST",
      body: JSON.stringify(tDeviceObj),
    })
      .then((res) => res.json())
      .then((json) => {
        const tempArr = [...sDevice, json.tdevice];
        setSDevice(tempArr);
      });

    // 전송 완료시 입력창 초기화...

    setLocation("");
    setUnit("");
    setProduct("");
    setMemo("");

    // 오류 있으면 표시
  };

  function 장비추가버튼클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setLocation("");
    setUnit("");
    setProduct("");
    setMemo("");
    setErrorMsg("");
  }

  // select Changed?
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }

  function delDevice(targetId: String) {
    console.log(targetId);

    if (!targetId) {
      alert("No ID!!!");
      return;
    }

    fetch(`http://localhost:3000/api/testdevice/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.dDevice);
        setSDevice(sDevice.filter((ele) => json.dDevice.id !== ele.id));
      });
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/testdevice/all")
      .then((res) => res.json())
      .then((json) => setSDevice(json.allDevice));
  }, [sDevice]);

  return (
    <Layout title={"SETTING"}>
      <div className="p-6 space-y-6 h-full overflow-y-scroll ">
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
            {/* // 원래는 폼 태그 & submit 사용  react form hook을 알아두면 좋다<div className=""></div>*/}
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
            <span>장치종류</span>
            <select
              className="h-12 ring-2 ring-black px-2 text-gray-800 "
              onChange={장치종류변경}
            >
              <option hidden>장치종류를 선택하세요.</option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2 센서</option>
            </select>
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
            {errorMsg ? <div className="text-red-500">{errorMsg}</div> : null}
            <button
              className="w-full rounded-lg py-5 sunmoon_btn"
              onClick={addTestDevice}
            >
              등록
            </button>
          </div>
          <hr></hr>
        </div>

        <div data-comment="장비삭제매뉴">
          <div>
            {sDevice.map((device, idx) => (
              <div key={idx} className="border-b-2 py-5 flex justify-between">
                <div>
                  <div>{device.id}</div>
                  <div>
                    {device.type} {device.product} - {device.location}
                  </div>
                  <div>{device.memo}</div>
                </div>
                <button
                  className="text-red-500 bg-red-200 w-16 h-16 rounded-lg"
                  onClick={() => delDevice(device.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
