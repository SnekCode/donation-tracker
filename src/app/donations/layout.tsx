import "../globals.css";

export const metadata = {
  title: "Add Donation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-4">{children}</div>;
}
