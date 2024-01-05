'use client';
import { EditorOnly } from '@/components/EditorOnly/EditorOnly';
import { I18nProvider } from '@/context/I18n/I18nProvider';
import { dictionaries } from './dictionaries';

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nProvider dictionaries={dictionaries}>
      <EditorOnly>{children}</EditorOnly>
    </I18nProvider>
  );
}
