import { Item, Key } from '@adobe/react-spectrum';
import { useBreakpoint, getResponsiveProp } from '@react-spectrum/utils';
import { type Orientation, type Responsive } from '@react-types/shared';
import Add from '@spectrum-icons/workflow/Add';
import Close from '@spectrum-icons/workflow/Close';
import Remove from '@spectrum-icons/workflow/Remove';
import { LabeledAcionGroup } from '../bases/LabeledActionGroup';

export const OPERATORS = ['+', '-', '*'] as const;
export type Operator = (typeof OPERATORS)[number];

function isOperator(val: unknown): val is Operator {
  return (OPERATORS as readonly unknown[]).includes(val);
}

export interface OperatorInputProps {
  label: string;
  value: string;
  orientation?: Responsive<Orientation>;
  onSelectionChange?: (value: Operator) => void;
}

export function OperatorInput({
  label,
  value,
  orientation: responsiveOrientation,
  onSelectionChange,
}: OperatorInputProps) {
  const handleAction = (key: Key) => {
    if (!isOperator(key)) {
      return;
    }
    onSelectionChange?.(key);
  };

  const { matchedBreakpoints } = useBreakpoint();
  const orientation =
    responsiveOrientation !== undefined
      ? getResponsiveProp<Orientation>(
          responsiveOrientation,
          matchedBreakpoints,
        )
      : undefined;

  return (
    <LabeledAcionGroup
      label={label}
      selectionMode="single"
      defaultSelectedKeys={[value]}
      disallowEmptySelection
      orientation={orientation}
      onAction={handleAction}
    >
      {OPERATORS.map((val) => {
        switch (val) {
          case '+':
            return (
              <Item key={val} aria-label={val}>
                <Add />
              </Item>
            );
          case '-':
            return (
              <Item key={val} aria-label={val}>
                <Remove />
              </Item>
            );
          case '*':
            return (
              <Item key={val} aria-label={val}>
                <Close />
              </Item>
            );
          default:
            val satisfies never;
            return undefined;
        }
      }).filter((el) => el !== undefined)}
    </LabeledAcionGroup>
  );
}
