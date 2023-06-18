import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db'

export const GET = async (request: NextRequest) => {
    const transactionTypes = await prisma.transactionType.findMany()
    return NextResponse.json(transactionTypes)
}

export const POST = async (request: NextRequest) => {
    const data = await request.json()
    const transactionType = await prisma.transactionType.create({
        data
    })
    return NextResponse.json(transactionType)
}