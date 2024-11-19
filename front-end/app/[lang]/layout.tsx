import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Locale } from "@/services/i18n";
import { setupLocale } from "@/services/i18n/server";
import { I18nProvider } from "@/services/i18n/client";

export const metadata: Metadata = {
  title: "GOAT",
  description: "Jump the city",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: Locale;
  }>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  setupLocale(lang);
  return (
    <html lang={lang}>
      <body>
        <I18nProvider>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
