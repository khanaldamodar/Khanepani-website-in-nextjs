import Footer from "@/components/global/Footer";
import NavbarServer from "@/components/global/NavbarServer";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"], 
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  
      <div>
        <NavbarServer />
        <main>{children}</main>
        <Footer />
      </div>
    
  );
}
