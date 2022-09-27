import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
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
          <div className="">실시간 버튼 자리..</div>
        </div>
        <div id="센서목록" className="flex flex-wrap">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((device, idx) => {
            return (
              <div
                className="bg-[#7cd0fa] border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl m-5
                dark:bg-[#2d3134] dark:border-[#454449]"
                data-comment="장비카드"
                key={idx}
              >
                <div className="flex justify-end">
                  <span className="text-5xl font-bold">25</span>
                  <span className="text-2xl text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400">
                    안방 - 메모
                  </span>
                  <span className="font-bold text-xl">사오미 공기 청정기</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
