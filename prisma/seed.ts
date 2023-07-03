import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

type DonationInput = (Prisma.DonationCreateWithoutDonorInput | Prisma.DonationCreateWithoutDepositInput)

async function main() {
    const donations: DonationInput[] = [
        {
            amount: 100,
            reason: {
                create: {
                    name: 'Donation',
                }
            },
            transactionType: {
                create: {
                    name: 'Cash',
                }
            }
        }
    ]


    const user = await prisma.donor.create({
        data: {
            name: 'John Doe',
            email: 'john.doe2@example.com',
            donations: {
                create: donations,
            },
        }
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })