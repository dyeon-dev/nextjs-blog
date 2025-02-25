import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { themeEffect } from "utils/themeEffect";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "dyeon-dev",
    template: "%s | dyeon-dev",
  },
  description: "지식들을 정리하고 기록해두는 공간입니다.",
  openGraph: {
    title: "dyeon-dev",
    description: "지식들을 정리하고 기록해두는 공간입니다.",
    url: baseUrl,
    siteName: "dyeon-dev",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>

      <body className="antialiased">
        <main className="flex flex-row justify-center max-w-screen-xl mx-auto px-4 lg:px-8 mt-8">
          <div className="flex-auto min-w-0 flex flex-col px-4 lg:px-6">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </main>
      </body>
    </html>
  );
}
