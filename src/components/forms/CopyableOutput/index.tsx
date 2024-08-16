import { useRef, useState } from 'react';
import {
  Flex,
  TextField,
  type SpectrumTextFieldProps,
  type TextProps,
} from '@adobe/react-spectrum';
import { ClipboardCopyButton } from '../../buttons';

export interface CopyableOutputProps {
  value: string | undefined;
  copyNotificationTimeout?: number;
  inputMaxWidth?: SpectrumTextFieldProps['width'];
  isTextHidden?: TextProps['isHidden'];
  isDisabled?: boolean;
  ariaLabel?: string;
  onCopy?: () => void;
}
export function CopyableOutput({
  value,
  copyNotificationTimeout = 1000,
  inputMaxWidth,
  isTextHidden,
  isDisabled,
  ariaLabel,
  onCopy,
}: CopyableOutputProps) {
  const [copied, setCopied] = useState(false);
  const copyStateTimeoutId = useRef<number | undefined>(undefined);

  const copyToClipboard = () => {
    if (value === undefined) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      onCopy?.();

      if (copyStateTimeoutId.current !== undefined) {
        clearTimeout(copyStateTimeoutId.current);
      }

      copyStateTimeoutId.current = window.setTimeout(() => {
        setCopied(false);
        copyStateTimeoutId.current = undefined;
      }, copyNotificationTimeout);
    });
  };

  return (
    <Flex gap="size-100" alignItems="center">
      <TextField
        value={value ?? ''}
        isReadOnly={true}
        width="auto"
        maxWidth={inputMaxWidth}
        aria-label={ariaLabel}
        flex={1}
        isDisabled={isDisabled}
      />
      <ClipboardCopyButton
        onPress={copyToClipboard}
        isCopied={copied}
        isDisabled={isDisabled ?? !value}
        isTextHidden={isTextHidden}
      />
    </Flex>
  );
}
