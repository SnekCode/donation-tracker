'use client';
import { DepositTableContext } from "@/app/context/deposit/DepositTableProvider";
import { useProvider } from "@/app/context/useProvider";
import React, { useEffect, useState } from "react";
import currency from "currency.js";


const ChequeTableHeaders: React.FC<{tableUpdate: boolean}> = ({tableUpdate}) => {
  const [state, setState] = useState({} as Element | null)
  
  
  useEffect(() => {
    if(typeof document === "undefined" || !document) {
      return
    }
    const tableElement = document.querySelector("#tableElement")
    
    setState(tableElement)
  }, [tableUpdate, state])

  
  if(!state) return null
  
  const tableWidth = state?.parentElement?.clientWidth
  const tableElementWidth = state.clientWidth
  if (!tableWidth || !tableElementWidth) return null

  const breakLine = <hr className={"border absolute border-slate-800 print:block w-12"}/>;

  const TableHeader = () => (
    <div className="flex relative" style={{width: `${tableElementWidth}px`}}>
        <div className="flex-grow ml-4 relative">
          <div>Name</div>
          <div>Check #</div>
        {breakLine}
        </div>
        <div className=" self-center">
          Amount 
        {breakLine}
          
          </div>
      </div>
  )


  const tableElementCount = Math.floor(tableWidth / tableElementWidth)
  return (
    <tr className=" w-full flex">
    <td className="flex flex-grow">
      {Array.from({length: tableElementCount}, (_, i) => <TableHeader key={i}/>)}
    </td>
  </tr>
  )
}


const ChequeTable = () => {
  const { getChequeDonations } = useProvider(DepositTableContext);

  const donations = getChequeDonations();
  return (
    <>
      <table className="ml-2">
        <thead className="w-full text-sm italic text-black font-mono">
          <tr>
            <td>
              {/* placeholder for header on print */}
              <div className="h-12" />
              <ChequeTableHeaders tableUpdate={donations.length > 0}/>
            </td>
          </tr>
        </thead>

        <tbody className="flex flex-wrap">
          {donations.map((donation) => (
            <tr id="tableElement" key={donation.id} className="flex w-1/2">
              <td className="flex-col flex-grow px-4">
                <div className="">
                  {donation.donor?.name}
                  <div>
                    {/* // random digit number between 0 - 99999 */}
                    {"#" + Math.floor(Math.random() * 100000)}
                  </div>
                </div>
              </td>
              <td className="flex-shrink self-end text-right">
                {currency(donation.amount).format()}
              </td>
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
    </>
  );
};

export default ChequeTable;
