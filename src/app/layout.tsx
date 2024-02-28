import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideBar } from "./_component/SideBar";
import { Flex } from "antd";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', margin: 0 }}>
        <SideBar></SideBar>
        <Flex gap={'middle'} align="start" vertical style={{ width: '84vw', padding: '20px' }}>
          {children}
        </Flex>
      </body>
    </html>
  );
}
