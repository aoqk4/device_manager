import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";
import { useRouter } from "next/router";

export interface CntTourListRes {
  obj: Obj;
}

export interface Obj {
  item_info: ItemInfo;
}

export interface ItemInfo {
  item: Item[];
}

export interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

const Home: NextPage = () => {
  const [totlaCnt, setTotalCnt] = useState(0);
  const [tours, setTours] = useState<Item[] | undefined>([]);
  const [pageNum, setPageNum] = useState(1);
  function useTour() {
    fetch("/api/tour/cntour")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log(json);
        // setTotalCnt(json.item_info.totalCnt);
      });
  }

  useEffect(() => {
    useTour();
  }, []);

  function 관광명소가져오기() {
    fetch(`/api/tour/cntourlist?start=${pageNum}&end=${pageNum + 4}`)
      .then((res) => {
        return res.json();
      })
      .then((json: CntTourListRes) => {
        const tempArr = tours || [];
        const newArr = json.obj?.item_info?.item || [];
        setTours([...tempArr, ...newArr]);
        setPageNum(pageNum + 5);
      });
  }

  useEffect(() => {
    관광명소가져오기();
  }, []);

  return (
    <Layout title={"충남 관광명소"}>
      <div>{totlaCnt}</div>
      <div>
        {tours?.map((ele, idx) => {
          return (
            <div key={idx}>
              <div>{ele.addr}</div>
              <div>{ele.lat}</div>
            </div>
          );
        })}
      </div>
      <button onClick={관광명소가져오기}>
        더보기 {tours?.length} / {460}
      </button>
    </Layout>
  );
};

export default Home;
