import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const conn = await connectToDatabase();
    res
      .status(200)
      .json({ message: "MongoDB Connected", host: conn.connection.host });
  } catch (error) {
    res.status(500).json({ message: "Connection failed", details: error });
  }
}
