import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "JOY E.M HIGH SCHOOL | Nursery to Class 10 (State Board)",
  description: "Welcome to JOY E.M HIGH SCHOOL, a premier English Medium K-10 educational institution offering holistic development, rich extra-curricular activities, expert faculty, and high academic standards under the State Board curriculum.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
