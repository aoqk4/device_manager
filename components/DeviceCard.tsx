import { testDevice } from "@prisma/client";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";

type DeviceCardProps = {
  device: testDevice;
  chk: boolean;
};

export default function DeviceCard({ device, chk }: DeviceCardProps) {
  const [val, setVal] = useState(0);
  const [timeId, setTimeId] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [chn, setChn] = useState("");

  useEffect(() => {
    fetch(`api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        setVal(json.value);
        if (json.value !== val) {
          setChn("text-red-500");
          setTimeout(() => {
            setChn("");
          }, 1000);
        }
      });

    if (chk) {
      if (0 === timeId) {
        setTimeId(
          window.setInterval(() => {
            setCnt((prev) => prev + 1);
          }, 3000)
        );
      }
    }
    if (!chk) {
      clearInterval(timeId);
      setTimeId(0);
    }
  }, [chk, cnt]);

  return (
    <div>
      {" "}
      <div
        className="bg-[#7cd0fa] border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl m-5
  dark:bg-[#2d3134] dark:border-[#454449]"
        data-comment="장비카드"
      >
        <div className="flex justify-end">
          <span className={cls("text-5xl font-bold", chn)}>
            {val ? val : "-"}
          </span>
          <span className="text-2xl text-gray-500 dark:text-gray-400">%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 dark:text-gray-400">
            {device.location} - {device.memo}
          </span>
          <span className="font-bold text-xl">{device.product}</span>
        </div>
      </div>
    </div>
  );
}
