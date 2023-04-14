import React, { useRef, useState } from "react";
import { Input } from "@mantine/core";
import { IMaskInput } from "react-imask";

interface CurrencyInputProps {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const CurrencyInput = ({
  name,
  defaultValue = "",
  onChange,
}: CurrencyInputProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <IMaskInput
      value={value}
      mask="R$ num"
      blocks={{
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: ".",
          radix: ",",
        },
      }}
      radix=","
      unmask={true}
      normalizeZeros={true}
      onAccept={(value, mask) => {
        setValue(mask.value);
      }}
    >
      {(inputProps: any) => (
        <Input
          {...inputProps}
          inputRef={inputRef}
          name={name}
          label="Valor"
          placeholder="R$ 0,00"
          value={value}
          onChange={handleChange}
        />
      )}
    </IMaskInput>
  );
};

export default CurrencyInput;
