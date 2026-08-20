import { Outfit, Inter } from "next/font/google";
import "@/globals.css";

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
  description:
    "Welcome to JOY E.M HIGH SCHOOL, a premier English Medium K-10 educational institution offering holistic development, rich extra-curricular activities, expert faculty, and high academic standards under the State Board curriculum since 2016.",
  icons: {
    icon: [
      { url: "/logo.png", href: "/logo.png" },
      { url: "/favicon.ico", href: "/favicon.ico" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
