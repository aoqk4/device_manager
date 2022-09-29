// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

type Data = {
  ok: boolean;
  dDevice?: testDevice;
  dSecning?: testDeviceSencing;
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

  console.log(request.query.id);

  try {
    const dSecning = await client.testDeviceSencing.deleteMany({
      where: {
        testDeviceId: request.query.id?.toString(),
      },
    });
    const dDevice = await client.testDevice.delete({
      where: {
        id: request.query.id?.toString(),
      },
    });

    response.status(200).json({ ok: true, dDevice });
  } catch (err) {
    response.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  }
}
