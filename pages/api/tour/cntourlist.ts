// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name?: string;
  totalCnt?: number;
  obj?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { start, end } = req.query;

  try {
    if (!start) {
      start = "1";
      end = "5";
    }
    if (!end) {
      end = (Number(start) + 4).toString();
    }
    if (Number(start) + 4 < Number(end)) {
      end = (Number(start) + 4).toString();
    }

    if (Number(start) >= Number(end)) {
      end = (Number(start) + 4).toString();
    }

    fetch(
      `http://tour.chungnam.go.kr/_prog/openapi/?func=tour&start=${start}&end=${end}`
    )
      .then((res) => {
        return res.text();
      })
      .then((xmlStr) => {
        return parseString(
          xmlStr,
          { explicitArray: false },
          function (err, result) {
            // console.log(JSON.stringify(result, null, 4));
            // console.log(result);
            const obj = result;
            res.status(200).json({ obj });
          }
        );
      });
    // res.status(200).json({ name: "John Doe" });
  } catch (e) {
    res.status(500).json({ name: "John Doe" });
  }
}
