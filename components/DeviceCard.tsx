import { testDevice } from "@prisma/client";
import { useEffect, useState } from "react";

type DeviceCardProps = {
  device: testDevice;
  chk: boolean;
};

export default function DeviceCard({ device, chk }: DeviceCardProps) {
  const [val, setVal] = useState(0);
  const [timeId, setTimeId] = useState(0);
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    fetch(`api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => setVal(json.value));

    if (chk) {
      if (0 === timeId) {
        setTimeId(
          window.setInterval(() => {
            setCnt((prev) => prev + 1);
            console.log(cnt);
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
          <span className="text-5xl font-bold">{val ? val : "-"}</span>
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
