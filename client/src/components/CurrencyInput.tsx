import { NativeSelect, TextInput } from '@mantine/core';
import React from 'react';

interface Props {
  multipler: string;
  setMultiplier: React.Dispatch<React.SetStateAction<string>>;
  form: any;
  inputName: string;
  placeholder: string;
  min: number;
  max: number;
}

// value == multiplicator (BGN as base)
const currencies: { value: string; label: string }[] = [
  { value: '1', label: '🇧🇬 BGN' },
  { value: '0.51', label: '🇪🇺 EUR' },
  { value: '0.55', label: '🇺🇸 USD' },
  { value: '0.7', label: '🇨🇦 CAD' },
  { value: '0.42', label: '🇬🇧 GBP' },
  { value: '0.75', label: '🇦🇺 AUD' },
];

export const CurrencyInput: React.FC<Props> = ({
  multipler,
  setMultiplier,
  form,
  inputName,
  min,
  max,
  placeholder,
}) => (
  <TextInput
    type="number"
    placeholder={placeholder}
    {...form.getInputProps(inputName)}
    min={min}
    max={max}
    mt="lg"
    label="Goal amount"
    rightSection={
      <NativeSelect
        data={currencies}
        value={multipler}
        onChange={(ev) => setMultiplier(ev.target.value)}
        styles={{
          input: {
            fontWeight: 500,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
      />
    }
    rightSectionWidth={92}
    required
  />
);
