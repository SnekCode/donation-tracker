import { NextRequest, NextResponse } from "next/server";
import prisma, { Prisma } from "@/db";

export const GET = async (request: NextRequest) => {
  const transactionTypes = await prisma.donation.findMany();
  return NextResponse.json(transactionTypes);
};

export const POST = async (request: NextRequest) => {
  // check if content type formdata
  let donation: Prisma.DonationCreateInput;

  const contentType = request.headers.get("content-type");
  if (!contentType || contentType.includes("form")) {
    const formdata = await request.formData();

    // null checks
    if (
      formdata.get("amount") === null ||
      formdata.get("donorId") === null ||
      formdata.get("transactionTypeId") === null
    ) {
      return NextResponse.next({
        status: 400,
        statusText: "Bad Request",
      });
    }

    donation = {
        amount: +formdata.get("amount")!,
        donor: {
            connect: {
                id: formdata.get("donorId") as string,
            }
        },
        transactionType:{
            connect: {
                id:  +formdata.get("transactionTypeId")!,
            }
        },
        reason: {
            connect: {
                // id: +formdata.get("reasonId")!,
                id: +formdata.get("reasonId")!,
            }
        }
    }
    // create partial type of donation
  } else {
    const data = await request.json();

    if (!data.amount || !data.donorId || !data.transactionTypeId) {
      return NextResponse.next({
        status: 400,
        statusText: "Bad Request",
      });
    }

    donation = {
        amount: data.amount,
        donor: {
            connect: {
                id: data.donorId,
            },
        },
        transactionType: {
            connect: {
                id: data.transactionTypeId,
            },
        },
        reason: {
            connect: {
                id: data.reasonId,
            },
        },
    };
}

    const transactionType = await prisma.donation.create({
        data: donation
    })

    return NextResponse.json(transactionType);
};
