import SearchBar from "@/app/components/searchbar/SearchBar";
import prisma from "@/db";
import DonorForm from "../components/searchbar/forms/DonorForrm";
import TransactionTypeForm from "../components/searchbar/forms/TransactionTypeForm";


// get payees from prisma
const payees = await prisma.donor.findMany({
    select: {
        name: true,
        id: true,
    },
});

// create an array of donor options
const donorOptions = payees.map((donor) => {
    return {
        value: donor.id,
        label: donor.name,
    };
}
);

const transactionTypes = await prisma.transactionType.findMany({
    select: {
        name: true,
        id: true,
    },
});

const transactionTypeOptions = transactionTypes.map((transactionType) => {
    return {
        value: transactionType.id.toString(),
        label: transactionType.name,
    };
}
);

const Page = () => {

        // create a form that allows the entry of a new donation
        // donation amount
        // select donor name from drop down (optional) but have the option to make a new donor with the new donation
        // select the transaction type (cash, check, credit card, etc)

        return (
            <div>
                <header className="text-xl">New Donation</header>
                <br></br>
                <main className="container flex items-center justify-center">
                    <form action="api/donation" method="post" className="w-auto flex flex-col px-4 py-4 container">
                        <input className="text-slate-800" type='number' name="amount" />
                        <label htmlFor="amount" className="pb-6">Donation Amount</label>
                        <SearchBar name="donorId" options={donorOptions} label="Donor" Form={DonorForm}/>
                        {/* <select name="type" className="text-slate-800" defaultValue={"Check"}>
                            <option>Cash</option>
                            <option>Check</option>
                            <option>Credit Card</option>
                        </select> */}
                        <SearchBar name="transactionTypeId" options={transactionTypeOptions} label="Transaction Type" Form={TransactionTypeForm} />
                        <button>Submit</button>
                    </form>
                </main>
            </div>
        );
}

export default Page;