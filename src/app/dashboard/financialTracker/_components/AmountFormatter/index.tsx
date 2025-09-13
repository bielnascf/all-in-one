/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { FinanceFormData } from "../FinanceFormModal";


interface AmountFormatterProps {
  name: "amount";
  control: Control<FinanceFormData>;
}

export function AmountFormatter({ name, control }: AmountFormatterProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          placeholder="R$ 0,00"
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, "");
            const numericValue = Number(onlyDigits) / 100;
            field.onChange(numericValue);
          }}
          value={
            typeof field.value === 'number'
              ? new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(field.value)
              : ''
          }
        />
      )}
    />
  );
}