import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const updateIds = await request.json() as number[];

    if (updateIds.length === 0) {
        return NextResponse.next({
            status: 400,
            statusText: "Bad Request",
        });
    }

    const deposit = await prisma.deposit.create({
        data: {
            donations: {
                connect: updateIds.map(id => ({ id }))
            }
        }})

    return NextResponse.json(deposit)
}