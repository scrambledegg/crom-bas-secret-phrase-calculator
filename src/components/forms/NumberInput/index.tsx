import { Button, Flex, Grid, TextField } from '@adobe/react-spectrum';

export interface NumberInputProps {
  label: string;
  value: number | undefined;
  onChange?: (value: number | undefined) => void;
}

export function NumberInput({ value, onChange, label }: NumberInputProps) {
  const handleTextChange = (newVal: string) => {
    if (onChange === undefined) {
      return;
    }
    if (newVal === '') {
      onChange(undefined);
      return;
    }
    const newNum = Number(newVal);
    if (!Number.isSafeInteger(newNum)) {
      return;
    }
    onChange(newNum);
  };

  const appendDigit = (num: number) => {
    if (onChange === undefined) {
      return;
    }
    if (value === undefined) {
      onChange(num);
      return;
    }

    onChange(value * 10 + num);
  };

  const deleteRightmostDigit = () => {
    if (onChange === undefined) {
      return;
    }
    if (value === undefined) {
      return;
    }

    const newVal = Math.floor(value * 0.1);
    if (Math.abs(newVal) < 1) {
      onChange(undefined);
      return;
    }
    onChange?.(newVal);
  };

  return (
    <Flex direction="column" gap="size-100">
      <TextField
        label={`${label}`}
        type="text"
        inputMode="numeric"
        value={value?.toString() ?? ''}
        width="auto"
        onChange={handleTextChange}
      />
      <Grid columns={['1fr', '1fr', '1fr']} gap="size-100">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <Button
            key={num}
            onPress={() => appendDigit(num)}
            variant="secondary"
            excludeFromTabOrder
          >
            {num}
          </Button>
        ))}
        <Button
          onPress={() => onChange?.(undefined)}
          variant="secondary"
          style="fill"
          isDisabled={value === undefined}
          excludeFromTabOrder
        >
          C
        </Button>
        <Button
          onPress={deleteRightmostDigit}
          variant="secondary"
          style="fill"
          isDisabled={value === undefined}
          excludeFromTabOrder
        >
          ←
        </Button>
      </Grid>
    </Flex>
  );
}
