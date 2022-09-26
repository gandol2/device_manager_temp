import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device } from "@prisma/client";

interface ResultData {
  ok: boolean;
  error?: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const bodyData = JSON.parse(req.body);
    console.log(bodyData);
    await client.device.create({
      data: {
        ...bodyData,
      },
    });
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
