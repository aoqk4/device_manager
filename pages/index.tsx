import { testDevice } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevice] = useState<testDevice[]>([]);
  const [chk, setChk] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/testdevice/all")
      .then((res) => res.json())
      .then((json) => setDevice(json.allDevice));
  }, [chk, devices]);

  return (
    <Layout title={"HOME"}>
      <div className="h-full overflow-y-scroll space-y-7">
        <div id="상단웰컴메시지" className="flex justify-between items-center">
          <div>
            <div className="text-5xl font-bold">Hello ㅁㅁㅁ </div>
            <div className="text-gray-500">Welcome back to Home!</div>
          </div>
          <Link href={"/setting"}>
            <button className="space-x-1 flex sunmoon_btn">
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
          </Link>
        </div>
        <div id="링크드유" className="flex justify-between items-center">
          <div className="text-3xl font-bold">Linked to You</div>
          <div className="">
            {/* <input type={"checkbox"} onChange={() => setChk(!chk)}></input> */}
            <label
              htmlFor="default-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                onChange={() => setChk(!chk)}
                type="checkbox"
                value=""
                id="default-toggle"
                className="sr-only peer"
              ></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <div className="flex justify-center">
              <div className="form-check form-switch"></div>
            </div>
            <div className="flex justify-center"></div>
          </div>
        </div>
        <div id="센서목록" className="flex flex-wrap">
          {0 < devices.length ? null : <div>등록된 장비가 없어요.</div>}
          {devices.map((device, idx) => {
            return <DeviceCard key={idx} device={device} chk={chk} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
