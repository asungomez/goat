import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, FocusEventHandler, useState } from 'react';

type EditableTextProps = {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  errorMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const EditableText: FC<EditableTextProps> = ({
  label,
  value,
  onChange,
  name,
  errorMessage,
  onBlur,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const clickHandler = () => {
    setIsEditing(true);
  };

  return (
    <FormControl isInvalid={!!errorMessage?.length}>
      {label && <FormLabel>{label}</FormLabel>}
      {isEditing ? (
        <Input value={value} onChange={onChange} name={name} onBlur={onBlur} />
      ) : (
        <Text onClick={clickHandler}>{value}</Text>
      )}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
