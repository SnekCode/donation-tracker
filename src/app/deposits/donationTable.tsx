"use client";
import React, { useState } from "react";
import { DepositTableDonations } from "./page";

interface DonationTableProps {
  donations: DepositTableDonations;
}

const DonationTable: React.FC<DonationTableProps> = ({ donations }) => {
  const [donationState, setDonationState] = useState(() => {
    return donations.map((donation) => ({
      ...donation,
      selected: false,
    }));
  });

  const [selectedDonations, setSelectedDonations] = useState([] as number[]);

  const handleDeposit = async () => {
  fetch("/api/deposit", {
    method: "POST",
    body: JSON.stringify(selectedDonations),
  })

  // remove selected donations from table
    const updatedDonationState = donationState.filter((donation) => {
        return !selectedDonations.includes(donation.id);
        }
    );
    setDonationState(updatedDonationState);
}

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    const updatedSelectedDonations = [] as number[];

    const updatedDonationState = donationState.map((donation) => {
      checked ? updatedSelectedDonations.push(donation.id) : null;
      return {
        ...donation,
        selected: e.currentTarget.checked,
      };
    });

    setSelectedDonations(updatedSelectedDonations);
    setDonationState(updatedDonationState);
  };

  const select = (id: number) => {
    console.log("select");

    const updatedDonationState = donationState.map((donation) => {
      if (donation.id === id) {
        return {
          ...donation,
          selected: !donation.selected,
        };
      }
      return donation;
    });
    const updatedSelectedDonations = [...selectedDonations];
    updatedSelectedDonations.push(id);
    setSelectedDonations(updatedSelectedDonations);
    setDonationState(updatedDonationState);
  };

  return (
    <>
      <table className={`mt-6 container`}>
        <tr className="text-left border">
          <input onChange={selectAll} type="checkbox" />
          <th>Name</th>
          <th>Amount</th>
          <th>Reason</th>
          <th>Transaction Type</th>
        </tr>
        <tbody>
          {donationState.map((donation, index) => (
            <tr
              className={`${index % 2 === 0 ? "bg-slate-600" : "bg-slate-700"}`}
              key={donation.id}
            >
              <input
                onChange={() => select(donation.id)}
                type="checkbox"
                checked={donation.selected}
              />
              <td>{donation.donor?.name}</td>
              <td>${donation.amount}</td>
              <td>{donation.reason.name}</td>
              <td>{donation.transactionType.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="p-4 border rounded"
        onClick={() => handleDeposit()}
      >
        Create Deposit
      </div>
    </>
  );
};

export default DonationTable;
