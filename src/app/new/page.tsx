import SearchBar from "@/components/SearchBar";
import prisma from "@/db";


// get payees from prisma
const payees = await prisma.payee.findMany({
    select: {
        name: true,
        id: true,
    },
});

// create an array of donor options
const donorOptions = payees.map((payee) => {
    return {
        value: payee.id,
        label: payee.name,
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
                <main className="flex justify-start">
                    <form action="/api/payee" method="post" className="flex flex-col px-4 py-4 container">
                        <input className="text-slate-800" type='number' name="amount" />
                        <label htmlFor="amount" className="pb-6">Donation Amount</label>
                        <SearchBar donorOptions={donorOptions} />
                        <label htmlFor="payee" className="pb-6 ">Donor Name</label>
                        <select name="type" className="text-slate-800" defaultValue={"Check"}>
                            <option>Cash</option>
                            <option>Check</option>
                            <option>Credit Card</option>
                        </select>
                        <label htmlFor="type" className="pb-6 ">Transaction Type</label>
                        <button>Submit</button>
                    </form>
                </main>
            </div>
        );
}

export default Page;