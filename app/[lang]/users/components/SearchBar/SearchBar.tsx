'use client';

import { useI18n } from '@/context/I18n/I18nContext';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';

type SearchBarProps = {
  onSearch?: (value: string) => void;
  loading?: boolean;
  error?: boolean;
};

export const SearchBar: FC<SearchBarProps> = ({ onSearch, loading, error }) => {
  const { t } = useI18n();
  const [value, setValue] = useState('');
  const inputReference = useRef<HTMLInputElement | null>(null);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [],
  );

  const submitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch, value],
  );

  const clearHandler = useCallback(() => {
    setValue('');
    if (inputReference.current) {
      inputReference.current.focus();
    }
  }, []);

  let rightElementWidth = 4.5;
  if (loading) {
    rightElementWidth += 2.5;
  }
  if (value.length > 0) {
    rightElementWidth += 2.5;
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl isInvalid={error}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" as={BsSearch} />
          </InputLeftElement>
          <Input
            type="text"
            value={value}
            onChange={changeHandler}
            ref={inputReference}
            focusBorderColor={error ? 'red.500' : undefined}
          />
          <InputRightElement width={`${rightElementWidth}rem`}>
            {value.length > 0 && (
              <IconButton
                aria-label={t('clear')}
                icon={<Icon color="gray.300" as={MdClear} />}
                size="xs"
                marginRight={2}
                variant="ghost"
                onClick={clearHandler}
              />
            )}
            <Button
              type="submit"
              isLoading={loading}
              loadingText={t('searching')}
            >
              {t('search')}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{t('search-failed')}</FormErrorMessage>
      </FormControl>
    </form>
  );
};
