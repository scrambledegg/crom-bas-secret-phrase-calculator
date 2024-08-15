import { Button, Text, type TextProps } from '@adobe/react-spectrum';
import PasteIcon from '@spectrum-icons/workflow/Paste';
import Checkmark from '@spectrum-icons/workflow/Checkmark';

export interface ClipboardCopyButtonProps {
  isCopied: boolean;
  isDisabled?: boolean;
  isTextHidden?: TextProps['isHidden'];
  onPress?: () => void;
}

export function ClipboardCopyButton({
  isCopied,
  isDisabled,
  isTextHidden,
  onPress,
}: ClipboardCopyButtonProps) {
  return (
    <Button
      onPress={onPress}
      variant="primary"
      isDisabled={isDisabled}
      aria-label="copy"
    >
      {isCopied ? (
        <>
          <Checkmark />
          <Text isHidden={isTextHidden}>コピー済み</Text>
        </>
      ) : (
        <>
          <PasteIcon />
          <Text isHidden={isTextHidden}>コピー</Text>
        </>
      )}
    </Button>
  );
}
