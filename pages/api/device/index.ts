import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device } from "@prisma/client";

interface ResultData {
  ok: boolean;
  devices: Device[];
}

// type Data = {
//   ok: boolean;
//   devices: Device[];
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {
  const devices = await client.device.findMany();

  res.status(200).json({ ok: true, devices });
}
