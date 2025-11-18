import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { ArrowLeft} from "lucide-react";

export const metadata: Metadata = {
  title: "Welcome to AuthTest",
  description: "This is a test flow for authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    <Link href='/'><header className=" fixed top-0 p-4 flex gap-1 hover:text-accent font-medium items-center hover:underline"><ArrowLeft size={18}/>Back Home</header></Link>
    <ThemeToggle />
    <div>{children}</div>
   </div>
  );
}
