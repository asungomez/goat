'use client';
import { AdminOnly } from '@/components/AdminOnly/AdminOnly';
import { I18nProvider } from '@/context/I18n/I18nProvider';
import { dictionaries } from './dictionaries';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider dictionaries={dictionaries}>
      <AdminOnly>{children}</AdminOnly>
    </I18nProvider>
  );
}
