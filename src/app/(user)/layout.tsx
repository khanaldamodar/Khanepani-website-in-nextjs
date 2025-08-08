import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import NavbarServer from "@/components/global/NavbarServer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarServer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
