"use client";
import "./page.css";
import React from "react";
import AccountInfo from "./AccountInfoLine";
import ChequeTable from "./ChequeTable";
import { useProvider } from "@/app/context/useProvider";
import { DepositTableContext } from "@/app/context/deposit/DepositTableProvider";


const Slip = () => {
  const { donations, getChequeTotal, getCurrencyTotal, getTotal } = useProvider(DepositTableContext);
  const date = new Date(Date.now()).toLocaleDateString("en-US");
  const name = "lorum ipsum";
  const accountNumber = 1234567890;
  const routingNumber = 9876543210;
  const breakLine = <hr className={"border-2 border-slate-800 print:block"} />;

  return (
    <div className="slip flex-col container print:m-0">
      <h2 className="ml-auto mr-5 mb-2 cursor-pointer rounded border p-2 w-min print:hidden">
        Print
      </h2>
      <main
        className={
          "w-full h-full bg-slate-300 text-slate-700 print:bg-white print:block"
        }
      >
        <AccountInfo header account={accountNumber} routing={routingNumber} />
        <h1 className={"uppercase h-12 mt-8 font-extrabold text-slate-800 text-center"}>
          Deposit
        </h1>
        <hr className={"w-full border-4 border-slate-800"} />

        <div className="flex px-2 space-x-2">
          <div className="mr-5 flex-1 flex-grow">
            <div className="">{`Today's Date: ${date}`}</div>
            {breakLine}
            <div>Customer Name: {name}</div>
            {breakLine}
            <div>Address: Lorem ipsum dolor sit amet consectetur</div>
          </div>

          <div className="flex flex-grow-0 w-1/3 space-x-6">
            <div className="space-y-2">
              <div className="border border-transparent uppercase">
                Currency{" "}
              </div>
              <div className="border border-transparent uppercase">Checks</div>
              <div className="border border-transparent uppercase">
                Sub Total
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="border border-black text-right">{getCurrencyTotal()}</div>
              <div className="border border-black text-right">{getChequeTotal()}</div>
              <div className="border border-black text-right">{getTotal()}</div>
            </div>
          </div>
        </div>

        {/* check data print formated */}
        <ChequeTable/>
        <AccountInfo
          footer
          account={accountNumber}
          routing={routingNumber}
        />
      </main>
    </div>
  );
};

export default Slip;
