import prisma, {
  Donor,
  TransactionType,
  DonationReason,
  
} from "@/db";
import DonationForm from "./components/DonationForm";

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
      <main className="">
        <DonationForm donorOptions={donorOptions} reasonOptions={reasonOptions} transactionTypeOptions={transactionTypeOptions}/>
      </main>
    </div>
  );
};

export default Page;
