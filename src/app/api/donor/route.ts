import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db'

export const GET = async (request: NextRequest) => {
    const transactionTypes = await prisma.donor.findMany()
    return NextResponse.json(transactionTypes)
}

export const POST = async (request: NextRequest) => {
    const data = await request.json()

    if (!data.name) {
        return NextResponse.next({
            status: 400,
            statusText: "Bad Request",
        })
      }
  

    const transactionType = await prisma.donor.create({
        data
    })
    return NextResponse.json(transactionType)
}