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
  const deviceId = req.query.id?.toString();
  if (!deviceId)
    return res.status(500).json({ ok: false, error: "ID를 입력하세요" });

  if (req.method !== "DELETE") {
    return res.status(405).json({ ok: false });
  }

  try {
    if (req.method === "DELETE") {
      await client.device.delete({ where: { id: deviceId } });
      res.status(200).json({ ok: true });
    }
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
