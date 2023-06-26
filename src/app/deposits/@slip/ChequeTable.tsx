import { DonationContext } from '@/app/context/donation/DonationProvider'
import { useProvider } from '@/app/context/useProvider'
import React from 'react'

const ChequeTable = () => {
    const {getChequeDonations} = useProvider(DonationContext)
    const donations = getChequeDonations()
  return (
    <table className="ml-3">
          <thead>
            <tr>
              <td>
                {/* placeholder for header on print */}
                <div className="h-12" />
              </td>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.donor?.name}</td>
                <br/>
                <td>{donation.amount}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td>
                {/* place holder for the footer on print */}
                <div className="h-12"></div>
              </td>
            </tr>
          </tfoot>
        </table>
  )
}

export default ChequeTable