// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  sencing?: testDeviceSencing;
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

  const resultVal = JSON.parse(request.body);

  try {
    const sencing = await client.testDeviceSencing.create({
      data: {
        value: resultVal.changeval,
        testDeviceId: resultVal.id,
      },
    });
    response.status(200).json({ ok: true, sencing });
  } catch (err) {
    response.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  } finally {
    await client.$disconnect();
  }
}
