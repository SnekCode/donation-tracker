import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

type DonationInput = (Prisma.DonationCreateWithoutPayeeInput | Prisma.DonationCreateWithoutDepositInput)

async function main() {
    const donations: DonationInput[] = [
        {
            amount: 100,
            reason: {
                create: {
                    name: 'Donation',
                }
            },
            type: {
                create: {
                    name: 'Cash',
                }
            }
        }
    ]


    const user = await prisma.payee.create({
        data: {
            name: 'John Doe',
            email: 'john.doe2@example.com',
            donations: {
                create: donations,
            },
        }
    })

    console.log(`Created user with ID: ${user.id}`)
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })