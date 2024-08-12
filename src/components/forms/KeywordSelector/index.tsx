import { Item } from '@adobe/react-spectrum';
import { LabeledAcionGroup } from '../bases/LabeledActionGroup';

export interface KeywordSelectorProps<T extends readonly string[]> {
  label: string;
  value: string;
  onSelectionChange: (value: T[number]) => void;
  keywords: T;
}

export function KeywordSelector<T extends readonly string[]>({
  label,
  value,
  onSelectionChange,
  keywords,
}: KeywordSelectorProps<T>) {
  return (
    <LabeledAcionGroup
      label={label}
      selectionMode="single"
      defaultSelectedKeys={[value]}
      disallowEmptySelection
      onAction={(key) => onSelectionChange(key.toString())}
    >
      {keywords.map((kw) => (
        <Item key={kw}>{kw}</Item>
      ))}
    </LabeledAcionGroup>
  );
}
