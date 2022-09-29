// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  tdevice?: testDevice;
  msg?: String;
};

// DB to Create
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ ok: false, msg: `지원하지 않는 메서드. ${request.method}` });
  }

  try {
    const obj = JSON.parse(request.body);

    const { product, location, type, unit, memo } = obj;

    //분해방법
    // const {
    //   body: { product, location, type, unit, memo },
    // } = request;

    // console.log(product, location, type, unit, memo);

    // 예외처리 영역..
    if (true) {
      if (!location) {
        return response
          .status(200)
          .json({ ok: false, msg: "설치 장소를 정확히 입력하여 주세요." });
      }
      if (!product) {
        return response
          .status(200)
          .json({ ok: false, msg: "제품을 정확히 입력하여 주세요." });
      }
      if (!unit) {
        return response
          .status(200)
          .json({ ok: false, msg: "단위를 정확히 입력하여 주세요." });
      }
      if (!type) {
        return response
          .status(200)
          .json({ ok: false, msg: "장치 종류를 정확히 입력하여 주세요." });
      }
    }

    const tdevice = await client.testDevice.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });

    // const tdeviceSencing = await client.testDeviceSencing.create({
    //   data: {
    //     value: 25,
    //     deviceid: tdevice.id,
    //   },
    // });

    response.status(200).json({ ok: true, tdevice });
  } catch (err) {
    response.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  }
}
