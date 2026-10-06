import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { LeadCaptureProvider } from "@/lib/lead-capture-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Левада — друкарня книг і журналів",
  description:
    "Левада — друкарня з 18-річним досвідом. Друк книг і журналів від 1 примірника, миттєвий розрахунок вартості та замовлення дзвінка.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LeadCaptureProvider>
          <NavBar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </LeadCaptureProvider>
      </body>
    </html>
  );
}
