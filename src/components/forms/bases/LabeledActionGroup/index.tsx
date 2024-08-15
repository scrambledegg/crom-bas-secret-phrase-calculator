import { useId } from 'react';
import {
  ActionGroup,
  Flex,
  SpectrumActionGroupProps,
} from '@adobe/react-spectrum';
import { actionButtonLabel } from './index.css';

export interface LabeledAcionGroup<T>
  extends Omit<SpectrumActionGroupProps<T>, 'aria-labelledby'> {
  label: string;
}

export function LabeledAcionGroup<T>({
  label,
  children,
  ...restProps
}: LabeledAcionGroup<T>) {
  const labelId = useId();

  return (
    <Flex direction="column" alignContent="start">
      <label id={labelId} className={actionButtonLabel}>
        {label}
      </label>
      <ActionGroup aria-labelledby={labelId} {...restProps}>
        {children}
      </ActionGroup>
    </Flex>
  );
}
