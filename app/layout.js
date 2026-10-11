import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Bhavna & Devansh - Wedding Invitation",
  description: "Join us in celebrating our wedding story.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
