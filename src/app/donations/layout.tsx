import "../globals.css";
import BasePageLayout from "../layout/BasePageLayout";

export const metadata = {
  title: "Add Donation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasePageLayout>{children}</BasePageLayout>;
}
