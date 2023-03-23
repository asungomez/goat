import { getTranslator, ValidLanguage } from '@/i18n';
import { dictionaries } from './dictionaries';

type HomeParams = {
  lang: ValidLanguage;
};

export default async function Home({
  params: { lang },
}: {
  params: HomeParams;
}) {
  const translate = getTranslator(dictionaries[lang]);
  return <h1>{translate('greeting')}</h1>;
}
