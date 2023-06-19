import prisma, { Prisma } from '@/db';
import React from 'react'
import DonationTable from './donationTable';

const getDonations = async () => await prisma.donation.findMany({
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

  export type DepositTableDonations = Prisma.PromiseReturnType<typeof getDonations>

  const donations = await getDonations();

const Page = async () => {

  return (
    <div className="container">
    <h2>Build Deposit</h2>
    <DonationTable donations={donations} />
    </div>
  )
}

export default Page