import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Measures } from "@prisma/client";

interface ResultData {
  ok: boolean;
  error?: String;
  value?: String | null;
}

interface Body {
  value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {
  const deviceId = req.query.id?.toString();
  if (!deviceId)
    return res.status(500).json({ ok: false, error: "ID를 입력하세요" });

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    if (req.method === "GET") {
      const measure = await client.measures.findFirst({
        where: { deviceId: deviceId },
        select: {
          value: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      console.log(
        `[GET] measure ${deviceId} - ${measure ? measure.value : measure}`
      );
      return res.status(200).json({ ok: true, value: measure?.value });
    }

    if (req.method === "POST") {
      const body: Body = JSON.parse(req.body);
      const id = req.query.id;

      await client.measures.create({
        data: {
          Device: {
            connect: {
              id: deviceId,
            },
          },
          value: body.value.toString(),
        },
      });

      console.log(id, body.value);
      console.log("POST 호출");
      return res.status(200).json({ ok: true });
    }
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  } finally {
    console.log("DB 연결제거");
    client.$disconnect();
  }
}
