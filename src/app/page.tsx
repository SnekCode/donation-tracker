// import prisma from db.ts
import Link from "next/link";
import prisma from "../db";

export default async function Home() {

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

  const donationCountPast = async (days:number) => await prisma.donation.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - days)),
      },
    },
  })

  const numberToDeposit = await prisma.donation.count({ where: { depositId: null } })

  const donations30Days = await donationCountPast(30)
  const donations30DaysAmount = await donationAmountPast(30)


  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl">Welcome</h1>
        <Link
          className="border border-slate-300 text-slate-300 
        px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700"
          href="/new"
        >
          New Donation
        </Link>
      </header>

      <main>
        <br></br>
        <h1>Donations to deposit: {numberToDeposit}</h1>
        <br></br>

        <h2 className="text-lg">Donations in the last 30 days</h2>
        <p className='text-slate-400 text-sm'>Number of donations: {donations30Days}</p>
        <p className='text-slate-400 text-sm'>Total amount: {donations30DaysAmount}</p>
        <p className='text-slate-400 text-sm'>Average donation amount: {donations30DaysAmount / donations30Days}</p>

        <br></br>
      </main>
    </>
  );
}