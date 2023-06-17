import { PrismaClient } from '@prisma/client'

const globalPrisma = global as unknown as { prisma?: PrismaClient }

const prisma = globalPrisma.prisma ?? new PrismaClient({log: ['query']})

if (process.env.NODE_ENV === 'production') globalPrisma.prisma = prisma

export default prisma
export * from '@prisma/client'