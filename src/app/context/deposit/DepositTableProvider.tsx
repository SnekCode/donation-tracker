"use client";
import { createContext, useState } from "react";
import { useProvider } from "../useProvider";
import { DepositTableDonations } from "@/app/deposits/layout";

export interface DepositTableType {
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

export type DepositTableContextProps = {
  children: React.ReactNode;
  donations: DepositTableDonations;
};

interface IByKey<T> {
  [key: string]: T;
}

export interface IDonationByKeys {
  byId: IByKey<DepositTableType>;
  selectedIds: number[];
}

export type DepositTableContextType = {
  donations: IDonationByKeys;
  toggleAll: (checked:boolean) => void;
  on: (id: number) => void;
  off: (id: number) => void;
  getCurrencyTotal: () => string;
  getChequeDonations: () => DepositTableType[];
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
    { byId: {} as IByKey<DepositTableType>, selectedIds: [] as number[] }
  );
};

export const DepositTableContext = createContext<DepositTableContextType | undefined>(
  undefined
);

export const useDonations = () => useProvider(DepositTableContext);

export const DepositTableProvider: React.FC<DepositTableContextProps> = ({
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
            }, {} as IByKey<DepositTableType>);
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

    const getChequeDonations = (): DepositTableType[] => {
        return donationToDeposit.selectedIds.reduce((acc, id) => {
            if (donationToDeposit.byId[id].transactionType.name === "Check"){
                return [...acc, donationToDeposit.byId[id]];
            }
            return acc;
        }, [] as DepositTableType[]);
    }

    const getChequeTotal = (): string => {
        const total = donationToDeposit.selectedIds.reduce((acc, id) => {
            if (donationToDeposit.byId[id].transactionType.name === "Check"){
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


  let context: DepositTableContextType = {
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
    <DepositTableContext.Provider value={context}>
      <section className={"slip flex space-x-4"}>{children}</section>
    </DepositTableContext.Provider>
  );
};

export default DepositTableProvider;

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
