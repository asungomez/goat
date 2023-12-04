import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

type TextFieldProps = {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  errorMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const TextField: FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  name,
  errorMessage,
  onBlur,
}) => {
  return (
    <FormControl isInvalid={!!errorMessage?.length}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input value={value} onChange={onChange} name={name} onBlur={onBlur} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
