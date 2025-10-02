import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { raleway } from "@/constants/fonts";
import { Theme } from "@radix-ui/themes";
import "react-day-picker/style.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "EnvyJet | Luxury Private Jet Booking",
  description:
    "Book your private jet with EnvyJet in just a few clicks. Exclusive service, unmatched comfort, and guaranteed privacy for business or leisure travel.",
  keywords: [
    "EnvyJet",
    "private jet booking",
    "private jet rental",
    "luxury flights",
    "business aviation",
    "exclusive travel",
    "charter jet service",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className}  antialiased`}>
        <Theme>
          <div className={clsx(raleway.className, "")}>{children}</div>
        </Theme>
      </body>
    </html>
  );
}
