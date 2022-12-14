// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  allDevice?: testDevice[];
  msg?: String;
};

// DB to Create
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    return response
      .status(405)
      .json({ ok: false, msg: `지원하지 않는 메서드. ${request.method}` });
  }

  try {
    const allDevice = await client.testDevice.findMany();
    response.status(200).json({ ok: true, allDevice });
  } catch (err) {
    response.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  } finally {
    await client.$disconnect();
  }
}
