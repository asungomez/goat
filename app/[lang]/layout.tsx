'use client';
import { I18nProvider } from '@/context/I18n/I18nProvider';
import { Flex } from '@chakra-ui/react';
import { Header } from './components/Header/Header';
import { dictionaries } from './dictionaries';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider dictionaries={dictionaries}>
      <Flex direction="column" align="center">
        <Header />
        {children}
      </Flex>
    </I18nProvider>
  );
}
