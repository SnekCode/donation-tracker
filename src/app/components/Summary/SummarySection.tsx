'use client'
import { useTheme } from "@/app/context/theme/ThemeProvider"

interface SummaryProps {
  numberToDeposit: number
  donations30Days: number
  donations30DaysAmount: number
  notDeposited30DaysAmount: number
}

const SummaryPage = ({ numberToDeposit, donations30Days, donations30DaysAmount, notDeposited30DaysAmount }: SummaryProps) => {
  'use client'
  const {border, altText, text} = useTheme()
  return (
<>
      <header className={`flex justify-between items-center`}>
        <h1>Welcome</h1>
      </header>

      <main>
        <br></br>
        <h2 >Donations to deposit: {numberToDeposit}</h2>
        <p>Amount: ${notDeposited30DaysAmount}</p>
        <br></br>

        <h2 >Donations in the last 30 days</h2>
        <p className={`${altText}`}>Number of donations: {donations30Days}</p>
        <p className={`${altText}`}>Total amount: ${donations30DaysAmount}</p>
        <p className={`${altText}`}>Average donation amount: ${donations30DaysAmount / donations30Days}</p>

        <br></br>
      </main>
    </>
  )
}

export default SummaryPage