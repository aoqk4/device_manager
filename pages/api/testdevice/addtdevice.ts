// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  tdevice?: testDevice;
  tdeviceSencing?: testDeviceSencing;
  msg?: String;
};

// DB to Create
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(504).json({ ok: false, msg: "잘못된 접근입니다." });
  }

  try {
    const obj = JSON.parse(req.body);

    console.log(obj.location);

    if (obj.location === "" || obj.product === "") {
      return res
        .status(200)
        .json({ ok: true, msg: "필수 정보를 정확히 입력하여 주세요." });
    }

    const tdevice = await client.testDevice.create({
      data: {
        location: obj.location,
        product: obj.product,
        unit: obj.unit,
        memo: obj.memo,
      },
    });

    const tdeviceSencing = await client.testDeviceSencing.create({
      data: {
        value: 25,
        deviceid: tdevice.id,
      },
    });

    res.status(200).json({ ok: true, tdevice, tdeviceSencing });
  } catch (err) {
    res.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  }
}
