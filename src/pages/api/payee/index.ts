// pages/api/payees.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma, {Payee} from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Payee | { message: string }>
) {
  if (req.method === "POST") {
    console.log(req.body);
    
    const { name, email } = JSON.parse(req.body);

    console.log("name", req.body.name);
    console.log("email", req.body.email);
    

    if (!name) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const payee = { name, email };
    // save payee to database using prisma
    const result = await prisma.payee.create({ data: payee });

    return res.status(201).json(result);
  }

  // return not implemented for other methods
  return res.status(501).json({ message: "Not implemented" });
}
