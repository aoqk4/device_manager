import { testDevice } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { eventNames } from "process";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevice] = useState<testDevice[]>([]);
  const [changeval, setChangeVal] = useState(0.0);
  const [id, SetId] = useState("");

  const objVal = {
    id,
    changeval,
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/testdevice/all")
      .then((res) => res.json())
      .then((json) => setDevice(json.allDevice));
  }, []);

  const submitVal = () => {
    // const bNumber = /[0-9]/.test(); // 문자열을 체크할 수 있는 정규 식이다.

    // if(Number.parseInt()) 숫자를 체크할수 있는

    if (!id || !changeval) {
      alert("모든 사항에 기입 해주세요.");
      setChangeVal(0.0);
      SetId("");
      return;
    }
    fetch("http://localhost:3000/api/sencing/addval", {
      method: "POST",
      body: JSON.stringify(objVal),
    });

    setChangeVal(0.0);
    SetId("");
  };

  return (
    <Layout title={"DATA"}>
      <div>
        <div className="w-full flex flex-col items-center">
          <select
            className="h-12 ring-2 ring-black px-2 text-gray-800 m-6 w-[90%]"
            onChange={(event) => {
              SetId(event.currentTarget.value);
            }}
          >
            <option hidden>장치를 선택하세요.</option>
            {devices.map((device) => {
              return (
                <option key={device.id} value={device.id}>
                  {device.product} - {device.location}
                </option>
              );
            })}
          </select>
          {id ? (
            <div className="w-full flex flex-col items-center">
              <div>선택한 장비 id : {id}</div>{" "}
              <input
                type={"text"}
                placeholder={"unit"}
                onChange={(event) =>
                  setChangeVal(parseFloat(event.target.value))
                }
                className="h-12 ring-2 ring-black px-2 text-gray-800 m-6 w-[90%]"
              ></input>
              <button
                className="w-[90%] rounded-lg py-5 sunmoon_btn"
                onClick={submitVal}
              >
                등록
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
