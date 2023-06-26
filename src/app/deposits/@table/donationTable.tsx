"use client";
import React from "react";
import { DonationContext } from "@/app/context/donation/DonationProvider";
import { useProvider } from "@/app/context/useProvider";

const DonationTable: React.FC = () => {
  const donationContext = useProvider(DonationContext)

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    donationContext.toggleAll(checked);
  };

  const select = (checked: boolean, id: number) => {

    if (checked) {
      donationContext.on(id);
    } else {
      donationContext.off(id);
    }
    
      return donationContext.donations.byId[id];
    };

  return (
    <>
      <table className={`mt-6 container`}>
        <thead className="text-left border">
          <tr>
            <td>
              <input onChange={selectAll} type="checkbox" />
            </td>
            <th>Name</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(donationContext.donations.byId).map((donationId, index) => {
            // convert to number
            const id = Number(donationId)
            const donation = donationContext.donations.byId[donationId]
            return (
            <tr
              className={`${index % 2 === 0 ? "bg-slate-600" : "bg-slate-700"}`}
              key={donationId}
            >
              <td>

              <input
                onChange={(e) => select(e.currentTarget.checked ,id)}
                type="checkbox"
                checked={donation.selected}
                />
                </td>
              <td>{donation.donor?.name}</td>
              <td>${donation.amount}</td>
              <td>{donation.reason.name}</td>
              <td>{donation.transactionType.name}</td>
            </tr>
          )})}
        </tbody>
      </table>
      {/* <div className="p-4 border rounded" onClick={() => handleDeposit()}>
        Create Deposit
      </div> */}
    </>
  );
};

export default DonationTable;
