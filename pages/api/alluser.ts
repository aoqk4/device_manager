// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface resDataType {
  name: String;
  users: User[];
}

// DB to Read All
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resDataType>
) {
  try {
    const users = await client.user.findMany();
    // console.log(users);
    res.status(200).json({ name: "OKOK", users });
  } catch (err) {
    console.log(err);
  } finally {
    await client.$disconnect();
  }
}
