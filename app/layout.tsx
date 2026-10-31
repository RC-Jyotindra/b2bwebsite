import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "ApexIntel | The World's Leading B2B Market Intelligence Platform",
  description: "Connect with over 1 million verified experts globally for unparalleled market insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <>
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
      <Toaster />
    </>
  );

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", raleway.variable, "font-sans", montserrat.variable)}
    >
      <body className="min-h-full flex flex-col bg-apex-cream dark:bg-apex-black text-apex-black dark:text-apex-white">
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
          <ClerkProvider appearance={{ theme: shadcn }}>
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
