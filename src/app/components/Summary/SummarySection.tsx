'use client'
import { useTheme } from "@/app/context/theme/ThemeProvider"
import Link from "next/link"

interface SummaryProps {
  numberToDeposit: number
  donations30Days: number
  donations30DaysAmount: number
}

const SummaryPage = ({ numberToDeposit, donations30Days, donations30DaysAmount }: SummaryProps) => {
  'use client'
  const {border, altText, text} = useTheme()
  return (
<>
      <header className={`flex justify-between items-center`}>
        <h1 className="text-2xl">Welcome</h1>
        <Link
          className={`${border} ${text} 
        px-2 py-1 rounded hover:bg-slate-600 focus-within:bg-slate-700`}
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
        <p className={`${altText} text-sm`}>Number of donations: {donations30Days}</p>
        <p className={`${altText} text-sm`}>Total amount: ${donations30DaysAmount}</p>
        <p className={`${altText} text-sm`}>Average donation amount: ${donations30DaysAmount / donations30Days}</p>

        <br></br>
      </main>
    </>
  )
}

export default SummaryPage