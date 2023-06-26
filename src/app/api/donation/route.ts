import { NextRequest, NextResponse } from "next/server";
import prisma, { Donation, Prisma } from "@/db";

const createDonation = async (donation: Prisma.DonationCreateInput) => {
    const res = await prisma.donation.create({
    data: donation,
    include: {
        donor: {
            select: {
                name: true,
                email: true,
            },
        },
        reason: {
            select: {
                name: true,
            },
        },
        transactionType: {
            select: {
                name: true,
            },
        },
    }
})
return res
}

export type CreateDonationReturnType = Prisma.PromiseReturnType<typeof createDonation>


export const GET = async (request: NextRequest) => {
    const donations = await prisma.donation.findMany({
        where: {
          depositId: null,
        },
        select: {
          id: true,
          amount: true,
          donor: {
            select: {
              name: true,
            },
          },
          reason: {
            select: {
              name: true,
            },
          },
          transactionType: {
            select: {
              name: true,
            },
          }
        }
      })

  return NextResponse.json(donations);
};

export const POST = async (request: NextRequest, response: NextResponse) => {
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
        amount: parseFloat(data.amount),
        donor: {
            connect: {
                id: data.donorId,
            },
        },
        transactionType: {
            connect: {
                id: parseInt(data.transactionTypeId),
            },
        },
        reason: {
            connect: {
                id: parseInt(data.reasonId),
            },
        },
    };
}

    const newDonation = await createDonation(donation);

    // return NextResponse.json(newDonation);
    return NextResponse.json(newDonation, {status: 201})
};
