import prisma, { Prisma } from '@/db';
import React from 'react'
import DonationTable from './donationTable';

const Page = async () => {

  return (
    <div className="container print:hidden">
    <h2>Build Deposit</h2>
    <DonationTable/>
    </div>
  )
}

export default Page