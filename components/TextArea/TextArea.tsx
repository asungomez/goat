import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

type TextAreaProps = {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
  errorMessage?: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

export const TextArea: FC<TextAreaProps> = ({
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
      <Textarea value={value} onChange={onChange} name={name} onBlur={onBlur} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
