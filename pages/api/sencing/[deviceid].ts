// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { testDevice, testDeviceSencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  value?: Number | undefined;
  msg?: String;
};

// DB to Create
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  try {
    const rDevice = await client.testDeviceSencing.findFirst({
      where: {
        testDeviceId: request.query.deviceid?.toString(),
      },
      select: {
        // 이 필드만 선택해서
        value: true, // 값을 선택가능하다.
      },
      orderBy: {
        // 정렬기능
        createAt: "desc", // 오름차순 반대 esc
      },
    });

    response.status(200).json({ ok: true, value: rDevice?.value });
  } catch (err) {
    response.status(200).json({ ok: false, msg: `${err}` });
    console.log(err);
  } finally {
    await client.$disconnect();
  }
}
