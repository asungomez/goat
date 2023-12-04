'use client';
import { DropZone } from '@/components/DropZone/DropZone';
import { useI18n } from '@/context/I18n/I18nContext';
import { languages, ValidLanguage } from '@/i18n';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FC, FormEventHandler, useMemo, useState } from 'react';
import { CityTranslationForm } from '../CityTranslationForm/CityTranslationForm';
import { FaRegSave } from 'react-icons/fa';
import { City, CityTranslation } from '@/model/city/types';
import { createCity } from '@/services/citiesService';

const EMPTY_TRANSLATION: CityTranslation = {
  name: '',
  slug: '',
  description: '',
};

export const CityForm: FC = () => {
  const [translations, setTranslations] = useState<City['translations']>({
    en: EMPTY_TRANSLATION,
    es: EMPTY_TRANSLATION,
  });
  const [creating, setCreating] = useState(false);
  const [valid, setValid] = useState<{ [language in ValidLanguage]: boolean }>({
    en: false,
    es: false,
  });
  const isValid = useMemo(
    () => Object.values(valid).reduce((acc, curr) => acc && curr, true),
    [valid],
  );

  const { t } = useI18n();

  const translationChangeHandler =
    (language: ValidLanguage) =>
    (newTranslation: CityTranslation, areValuesValid: boolean) => {
      setTranslations((prevTranslations) => ({
        ...prevTranslations,
        [language]: {
          ...newTranslation,
        },
      }));
      setValid((valid) => ({
        ...valid,
        [language]: areValuesValid,
      }));
    };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (isValid) {
      setCreating(true);
      createCity({ translations, images: [] })
        .then(() => {
          setCreating(false);
        })
        .catch(() => {
          setCreating(false);
        });
    }
  };

  return (
    <Container
      maxW={{
        base: 'container.sm',
        sm: 'container.sm',
        md: 'container.md',
        lg: 'container.lg',
        xl: 'container.xl',
      }}
      mb={8}
    >
      <form style={{ width: '100%' }} onSubmit={submitHandler}>
        <HStack spacing={4} wrap="wrap" alignItems="flex-start">
          <Box padding={2} mt={2} mb={2} width={{ base: '100%', lg: '48%' }}>
            <Heading as="h2" mb={4}>
              {t('form.labels.images')}
            </Heading>
            <DropZone />
          </Box>
          <Box width={{ base: '100%', lg: '48%' }}>
            {languages.map((lang) => (
              <Box key={lang} padding={2} mb={2} mt={2}>
                <CityTranslationForm
                  language={lang}
                  onChange={translationChangeHandler(lang)}
                />
              </Box>
            ))}
          </Box>
        </HStack>

        <Flex justifyContent={'flex-end'} mt={2}>
          <Box mr={2}>
            <Button variant="outline">{t('form.buttons.cancel')}</Button>
          </Box>
          <Box>
            <Button
              type="submit"
              leftIcon={<Icon as={FaRegSave} />}
              isLoading={creating}
              isDisabled={!isValid || creating}
            >
              {t('form.buttons.save')}
            </Button>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};
