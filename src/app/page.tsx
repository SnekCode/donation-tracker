// import prisma from db.ts
import prisma from "../db";
import SummaryPage from "@/app/components/Summary/SummarySection";

export default async function Home() {

  // hydration function
  const donationAmountPast = async (days:number) => {
    const aggregate = await prisma.donation.aggregate({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - days)),
        },
      },
      _sum: {
        amount: true,
      },
    })

    return aggregate._sum.amount ?? 0
}
  // hydration function
  const donationCountPast = async (days:number) => await prisma.donation.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - days)),
      },
    },
  })

  // get amount of non deposited donations
  const notDepositedAmountPast = async (days:number) => {
    const aggregate = await prisma.donation.aggregate({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - days)),
        },
        depositId: null,
      },
      _sum: {
        amount: true,
      },
    })

    return aggregate._sum.amount ?? 0
  }

  const numberToDeposit = await prisma.donation.count({ where: { depositId: null } })

  const donations30Days = await donationCountPast(30)
  const donations30DaysAmount = await donationAmountPast(30)
  const notDeposited30DaysAmount = await notDepositedAmountPast(30)


  return (
    <SummaryPage 
    donations30Days={donations30Days} 
    donations30DaysAmount={donations30DaysAmount} 
    numberToDeposit={numberToDeposit}
    notDeposited30DaysAmount={notDeposited30DaysAmount}
    />
  );
}