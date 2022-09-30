// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  totalCnt?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch("http://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => {
        return res.text();
      })
      .then((xmlStr) => {
        return parseString(
          xmlStr,
          { explicitArray: false },
          function (err, result) {
            console.log(JSON.stringify(result, null, 4));
            console.log(result.item_info.item.totalCnt);
            const totalCnt = result.item_info.item.totalCnt;
            res.status(200).json({ name: "John Doe", totalCnt });
          }
        );
      });
    // res.status(200).json({ name: "John Doe" });
  } catch (e) {
    res.status(500).json({ name: "John Doe" });
  }
}
