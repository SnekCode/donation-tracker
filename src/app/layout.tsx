import "./globals.css";
import ThemeProvider from "./context/theme/ThemeProvider";
import ModalProvider from "./context/modal/ModalProvider";
import { ToastProvider } from "./context/toast/ToastProvider";
import NavigationHeader, { NavigationLink } from "./components/NavigationHeader";
import {useRouter} from 'next/router'

export const metadata = {
  title: "Donation Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <NavigationHeader>
                <NavigationLink href="/">Home</NavigationLink>
                <NavigationLink href="/donations">Donations</NavigationLink>
                <NavigationLink href="/deposits">Deposits</NavigationLink>
              </NavigationHeader>  
            {children}
            
          <div id="modal-root"></div>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
  );
}
