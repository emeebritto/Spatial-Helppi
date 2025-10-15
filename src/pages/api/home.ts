import type { NextApiRequest, NextApiResponse } from 'next';
import bodyParser from "body-parser";
import { Error } from "@/types/api";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<[]|Error>
) {
  try {
    res.status(200).json([]);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ msg: "something is wrong :|" });
  }
}
