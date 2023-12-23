import { useI18n } from '@/context/I18n/I18nContext';
import { getLocalizedRoute } from '@/i18n';
import { useRouter } from 'next/navigation';

export const useNavigate = () => {
  const { currentLanguage } = useI18n();
  const router = useRouter();

  const navigate = (path: string) => {
    if (currentLanguage) {
      const translatedRoute = getLocalizedRoute(path, currentLanguage);
      router.push(translatedRoute);
    } else {
      router.push(path);
    }
  };

  return navigate;
};
