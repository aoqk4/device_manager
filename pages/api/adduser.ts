// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

type Data = {
  ok: boolean;
  user?: User;
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

    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(200).json({ ok: false });
    console.log(err);
  } finally {
    await client.$disconnect();
  }
}
