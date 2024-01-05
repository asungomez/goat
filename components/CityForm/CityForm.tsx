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
  Spacer,
} from '@chakra-ui/react';
import {
  FC,
  FormEventHandler,
  useMemo,
  useState,
  ChangeEventHandler,
} from 'react';
import { FaRegSave } from 'react-icons/fa';
import { City, CityFormValues, CityTranslation } from '@/model/city/types';
import { createCity } from '@/services/citiesService';
import { useNavigate } from '@/hooks/useNavigate';
import { TextField } from '@/components/TextField/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextArea } from '@/components/TextArea/TextArea';
import { EditableText } from '@/components/EditableText/EditableText';

const EMPTY_TRANSLATION: CityTranslation = {
  name: '',
  slug: '',
  description: '',
};

const EMPTY_CITY: CityFormValues = {
  images: [],
  translations: {
    en: EMPTY_TRANSLATION,
    es: EMPTY_TRANSLATION,
  },
};

type CityFormProps = {
  initialValues?: CityFormValues;
};

export const CityForm: FC<CityFormProps> = ({ initialValues = EMPTY_CITY }) => {
  const [translations, setTranslations] = useState<City['translations']>({
    en: initialValues?.translations?.en ?? EMPTY_TRANSLATION,
    es: initialValues?.translations?.es ?? EMPTY_TRANSLATION,
  });
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState<{ [language in ValidLanguage]: boolean }>({
    en: !!initialValues?.translations?.en,
    es: !!initialValues?.translations?.es,
  });
  const isValid = useMemo(
    () => Object.values(valid).reduce((acc, curr) => acc && curr, true),
    [valid],
  );
  const navigate = useNavigate();

  const { t, currentLanguage } = useI18n();

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
      setSubmitting(true);
      createCity({ translations, images: [] })
        .then((city) => {
          setSubmitting(false);
          if (currentLanguage) {
            navigate(
              `/content/city/${city.translations[currentLanguage].slug}`,
            );
          }
        })
        .catch(() => {
          setSubmitting(false);
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
              {t('cityForm.labels.images')}
            </Heading>
            <DropZone />
          </Box>
          <Box width={{ base: '100%', lg: '48%' }}>
            {languages.map((lang) => (
              <Box key={lang} padding={2} mb={2} mt={2}>
                <CityTranslationForm
                  language={lang}
                  onChange={translationChangeHandler(lang)}
                  initialValues={initialValues?.translations?.[lang]}
                />
              </Box>
            ))}
          </Box>
        </HStack>

        <Flex justifyContent={'flex-end'} mt={2}>
          <Box mr={2}>
            <Button variant="outline">{t('cityForm.buttons.cancel')}</Button>
          </Box>
          <Box>
            <Button
              type="submit"
              leftIcon={<Icon as={FaRegSave} />}
              isLoading={submitting}
              isDisabled={!isValid || submitting}
            >
              {t('cityForm.buttons.save')}
            </Button>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};

const generateSlugFromName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w-]+/g, '');
};

type CityTranslationFormValues = {
  name: string;
  slug: string;
  description: string;
};

const DEFAULT_VALUES: CityTranslationFormValues = {
  name: '',
  slug: '',
  description: '',
};

type CityTranslationFormProps = {
  language: ValidLanguage;
  initialValues?: CityTranslationFormValues;
  onChange?: (values: CityTranslationFormValues, isValid: boolean) => void;
};

export const CityTranslationForm: FC<CityTranslationFormProps> = ({
  language,
  initialValues = DEFAULT_VALUES,
  onChange,
}) => {
  const { t } = useI18n();

  const validationSchema = Yup.object<CityTranslationFormValues>({
    name: Yup.string().required(t('cityForm.errors.name.required')),
    slug: Yup.string()
      .required(t('cityForm.errors.slug.required'))
      // Only allow lowercase letters and dashes
      .matches(/^[a-z0-9]+(?:-[a-z]+)*$/, t('cityForm.errors.slug.format')),
    description: Yup.string().required(
      t('cityForm.errors.description.required'),
    ),
  });

  const { handleChange, values, setValues, touched, handleBlur, errors } =
    useFormik<CityTranslationFormValues>({
      initialValues,
      onSubmit: () => {},
      validationSchema,
    });

  const currentValuesValid = useMemo(
    () => Object.values(errors).reduce((acc, curr) => acc && !curr, true),
    [errors],
  );

  const nameChangeHander: ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValues = { ...values };
    if (!touched.slug) {
      const slug = generateSlugFromName(event.target.value);
      newValues = { ...values, slug };
      setValues((prev) => ({
        ...prev,
        slug,
      }));
    }
    newValues = { ...newValues, name: event.target.value };
    handleChange(event);
    onChange?.(newValues, currentValuesValid);
  };

  const slugChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValues = { ...values, slug: event.target.value };
    handleChange(event);
    onChange?.(newValues, currentValuesValid);
  };

  const descriptionChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const newValues = { ...values, description: event.target.value };
    handleChange(event);
    onChange?.(newValues, currentValuesValid);
  };

  return (
    <>
      <Heading as="h2" mb={4}>
        {t(`cityForm.titles.${language}`)}
      </Heading>
      <TextField
        label={t('cityForm.labels.name')}
        value={values.name}
        onChange={nameChangeHander}
        name="name"
        onBlur={handleBlur}
        errorMessage={touched.name ? errors.name : undefined}
      />
      <Spacer mb={3} />
      <EditableText
        label={t('cityForm.labels.slug')}
        value={values.slug}
        onChange={slugChangeHandler}
        name="slug"
        onBlur={handleBlur}
        errorMessage={touched.slug ? errors.slug : undefined}
      />
      <Spacer mb={3} />
      <TextArea
        label={t('cityForm.labels.description')}
        value={values.description}
        onChange={descriptionChangeHandler}
        name="description"
        onBlur={handleBlur}
        errorMessage={touched.description ? errors.description : undefined}
      />
    </>
  );
};
