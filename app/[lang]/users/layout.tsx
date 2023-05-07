'use client';
import { AdminOnly } from '@/components/AdminOnly/AdminOnly';
import { I18nProvider } from '@/context/I18n/I18nProvider';
import { UsersManagementProvider } from '@/context/UsersManagement/UsersManagementProvider';
import { dictionaries } from './dictionaries';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider dictionaries={dictionaries}>
      <AdminOnly>
        <UsersManagementProvider>{children}</UsersManagementProvider>
      </AdminOnly>
    </I18nProvider>
  );
}
