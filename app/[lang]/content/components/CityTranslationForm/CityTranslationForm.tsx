import { TextField } from '@/components/TextField/TextField';
import { useI18n } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
import { Heading, Spacer } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextArea } from '@/components/TextArea/TextArea';
import { EditableText } from '@/components/EditableText/EditableText';

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
  defaultValues?: CityTranslationFormValues;
  onChange?: (values: CityTranslationFormValues, isValid: boolean) => void;
};

export const CityTranslationForm: FC<CityTranslationFormProps> = ({
  language,
  defaultValues = DEFAULT_VALUES,
  onChange,
}) => {
  const { t } = useI18n();

  const validationSchema = Yup.object<CityTranslationFormValues>({
    name: Yup.string().required(t('form.errors.name.required')),
    slug: Yup.string()
      .required(t('form.errors.slug.required'))
      // Only allow lowercase letters and dashes
      .matches(/^[a-z]+(?:-[a-z]+)*$/, t('form.errors.slug.format')),
    description: Yup.string().required(t('form.errors.description.required')),
  });

  const { handleChange, values, setValues, touched, handleBlur, errors } =
    useFormik<CityTranslationFormValues>({
      initialValues: defaultValues,
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
        {t(`form.titles.${language}`)}
      </Heading>
      <TextField
        label={t('form.labels.name')}
        value={values.name}
        onChange={nameChangeHander}
        name="name"
        onBlur={handleBlur}
        errorMessage={touched.name ? errors.name : undefined}
      />
      <Spacer mb={3} />
      <EditableText
        label={t('form.labels.slug')}
        value={values.slug}
        onChange={slugChangeHandler}
        name="slug"
        onBlur={handleBlur}
        errorMessage={touched.slug ? errors.slug : undefined}
      />
      <Spacer mb={3} />
      <TextArea
        label={t('form.labels.description')}
        value={values.description}
        onChange={descriptionChangeHandler}
        name="description"
        onBlur={handleBlur}
        errorMessage={touched.description ? errors.description : undefined}
      />
    </>
  );
};
