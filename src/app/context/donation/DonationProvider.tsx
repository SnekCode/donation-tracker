"use client";
import { createContext, useState } from "react";
import { useProvider } from "../useProvider";
import { DepositTableDonations } from "@/app/deposits/layout";

export interface DonationType {
    donor: {
        name: string;
    } | null;
    transactionType: {
        name: string;
    };
    id: number;
    reason: {
        name: string;
    };
    amount: number;
  selected: boolean;
};

export type DonationContextProps = {
  children: React.ReactNode;
  donations: DepositTableDonations;
};

interface IByKey {
  [key: string]: DonationType;
}

export interface IDonationByKeys {
  byId: IByKey;
  selectedIds: number[];
}

export type DonationContextType = {
  donations: IDonationByKeys;
  toggleAll: (checked:boolean) => void;
  on: (id: number) => void;
  off: (id: number) => void;
  getCurrencyTotal: () => string;
  getChequeDonations: () => DonationType[];
  getChequeTotal: () => string;
  getTotal: () => string;
};

export const convertToByKeys = (donations: DepositTableDonations) => {
  return donations.reduce(
    (acc, donation) => {
      return {
        ...acc,
        byId: {
          ...acc.byId,
          [donation.id]: donation,
        },
        selectedIds: []
      };
    },
    { byId: {} as IByKey, selectedIds: [] as number[] }
  );
};

export const DonationContext = createContext<DonationContextType | undefined>(
  undefined
);

export const useDonations = () => useProvider(DonationContext);

export const DonationProvider: React.FC<DonationContextProps> = ({
  children,
  donations,
}) => {
  const [donationToDeposit, setDonationsToDeposit] = useState<IDonationByKeys>(
    () => convertToByKeys(donations)
  );

  const on = (id: number) => {
    setDonationsToDeposit((donationToDeposit) => {

        return {
            ...donationToDeposit,
            byId: {
            ...donationToDeposit.byId,
            [id]: {
                ...donationToDeposit.byId[id],
                selected: true,
            },
            },
            selectedIds: [...donationToDeposit.selectedIds, id]
        };
        }
    )};

    const off = (id: number) => {
        setDonationsToDeposit((donationToDeposit) => {
            const selectedIds = donationToDeposit.selectedIds.filter(
                (selectedId) => selectedId !== id
            );
            return {
                ...donationToDeposit,
                byId: {
                ...donationToDeposit.byId,
                [id]: {
                    ...donationToDeposit.byId[id],
                    selected: false,
                },
                },
                selectedIds
            };
            }
        )}

    const toggleAll = (checked:boolean) => {
        const allIds = Object.keys(donationToDeposit.byId).map(Number);
        const updatedByIds = allIds.reduce((acc, id) => {
            return {
                ...acc,
                [id]: {
                    ...donationToDeposit.byId[id],
                    selected: checked,
                },
            };
            }, {} as IByKey);
        setDonationsToDeposit({byId: updatedByIds, selectedIds: checked ? allIds : []})
    }

    const getCurrencyTotal = (): string => {
        const total = donationToDeposit.selectedIds.reduce((acc, id) => {
            if (donationToDeposit.byId[id].transactionType.name === "Cash"){
            return acc + donationToDeposit.byId[id].amount;
            }else{
                return acc;
            }
        }, 0);
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    const getChequeDonations = (): DonationType[] => {
        return donationToDeposit.selectedIds.reduce((acc, id) => {
            if (donationToDeposit.byId[id].transactionType.name === "Cheque"){
                return [...acc, donationToDeposit.byId[id]];
            }
            return acc;
        }, [] as DonationType[]);
    }

    const getChequeTotal = (): string => {
        const total = donationToDeposit.selectedIds.reduce((acc, id) => {
            if (donationToDeposit.byId[id].transactionType.name === "Cheque"){
            return acc + donationToDeposit.byId[id].amount;
            }else{
                return acc;
            }
        }, 0);
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    const getTotal = (): string => {
        const total = donationToDeposit.selectedIds.reduce((acc, id) => {
            return acc + donationToDeposit.byId[id].amount;
        }, 0);
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }


  let context: DonationContextType = {
    donations: donationToDeposit,
    on,
    off,
    toggleAll,
    getCurrencyTotal,
    getChequeDonations,
    getChequeTotal,
    getTotal,

  };

  return (
    <DonationContext.Provider value={context}>
      <section className={"slip flex space-x-4"}>{children}</section>
    </DonationContext.Provider>
  );
};

export default DonationProvider;

// const [selectedDonations, setSelectedDonations] = useState([] as number[]);

// const handleDeposit = async () => {
//   fetch("/api/deposit", {
//     method: "POST",
//     body: JSON.stringify(selectedDonations),
//   });

//   // remove selected donations from table
//   const updatedDonationState = donationState.filter((donation) => {
//     return !selectedDonations.includes(donation.id);
//   });
//   setDonationState(updatedDonationState);
// };
