import { useI18n } from '@/context/I18n/I18nContext';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Icon,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

type DropZoneProps = {
  label?: string;
};

export const DropZone: FC<DropZoneProps> = ({ label }) => {
  const { t } = useI18n();
  return (
    <FormControl variant="floating">
      {label && <FormLabel>{label}</FormLabel>}
      <Card
        variant="outline"
        width={{
          base: 'input.sm',
        }}
      >
        <CardBody>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Button variant="solid" size="md">
              <Icon as={IoCloudUploadOutline} />
            </Button>
            <Text>
              <Link color="teal.500" fontWeight="bold">
                {t('click-to-upload')}
              </Link>{' '}
              {t('or-drag-and-drop')}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </FormControl>
  );
};
