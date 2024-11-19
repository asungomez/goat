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
  params: {
    lang: Locale;
  };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  setupLocale(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <I18nProvider>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
