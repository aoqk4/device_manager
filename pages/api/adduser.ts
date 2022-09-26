// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

type Data = {
  name: string;
};

// DB to Create
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "홍길순", age: 25, addr: "아산시" },
    });
    res.status(200).json({ name: "OKOK" });
  } catch (err) {
    res.status(200).json({ name: "NGNGNG" });
    console.log(err);
  }
}
