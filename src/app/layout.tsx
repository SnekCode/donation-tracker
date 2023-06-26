import './globals.css'
import ThemeProvider from "./context/theme/ThemeProvider";
import ModalProvider from "./context/modal/ModalProvider";
import { ToastProvider } from "./context/toast/ToastProvider";
import NavigationHeader, { NavigationLink } from "./components/NavigationHeader";
import BasePageLayout from "./baselayout/BasePageLayout";



export async function generateMetadata() {
  return {
    title: "Donation Tracker",
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <NavigationHeader>
                <NavigationLink href="/">Home</NavigationLink>
                <NavigationLink href="/donations">Donations</NavigationLink>
                <NavigationLink href="/deposits">Deposits</NavigationLink>
              </NavigationHeader>  
              <BasePageLayout>
                {children}
              </BasePageLayout>
          <div id="modal-root"></div>          
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </html>
  );
}
