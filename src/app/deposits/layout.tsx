import prisma, { Prisma } from "@/db";
import DepositTableProvider from "../context/deposit/DepositTableProvider";

export const metadata = {
  title: "Build Deposit",
};


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

const donations = await getDonations()

export default function RootLayout({
  children,
  table,
  slip,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
  slip: React.ReactNode;
}) {
  return (
    <>
      {children}
        <DepositTableProvider donations={donations}>
          {table}
          {slip}
        </DepositTableProvider>
    </>
  );
}
