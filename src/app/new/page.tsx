import SearchBar from "@/app/components/searchbar/SearchBar";
import prisma, {
  Donor,
  TransactionType,
  DonationReason,
  
} from "@/db";
import DonorForm from "../components/searchbar/forms/DonorForrm";
import TransactionTypeForm from "../components/searchbar/forms/TransactionTypeForm";
import { PrismaClientOptions } from "@prisma/client/runtime";

interface Option {
  value: string;
  label: string;
}

const getOptions = async (entityName: keyof typeof prisma): Promise<Option[]> => {
    // prisma as any is a ts hack https://github.com/prisma/prisma/discussions/4397#discussioncomment-148215
    const entities = await (prisma as any)[entityName].findMany({
        select: {
            name: true,
            id: true,
        },
    });
    return entities.map((entity: Donor | TransactionType | DonationReason) => ({
        value: entity.id.toString(),
        label: entity.name,
    }));
};

const donorOptions = await getOptions("donor");
const transactionTypeOptions = await getOptions("transactionType");
const reasonOptions = await getOptions("donationReason");

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
        <form
          action="api/donation"
          method="post"
          className="w-auto flex flex-col px-4 py-4 container"
        >
          <input className="text-slate-800" type="number" name="amount" />
          <label htmlFor="amount" className="pb-6">
            Donation Amount
          </label>
          <SearchBar
            name="donorId"
            options={donorOptions}
            label="Donor"
            Form={DonorForm}
          />
          <SearchBar
            name="transactionTypeId"
            options={transactionTypeOptions}
            label="Transaction Type"
            Form={TransactionTypeForm}
          />
          <SearchBar
            name="reasonId"
            options={reasonOptions}
            label="Reason"
            Form={DonorForm}
          />
          <button>Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Page;
