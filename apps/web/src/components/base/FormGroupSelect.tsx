import { FormGroup, FormGroupLabel, FormSelect } from "@design-system";
import { forwardRef } from "react";

type FormGroupSelectProps = {
  label: string;
  name: string;
  onBlur: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string }>;
};

export const FormGroupSelect = forwardRef<HTMLSelectElement, FormGroupSelectProps>(
  ({ options, onChange, onBlur, name, label: fGLabel }, ref) => (
    <FormGroup>
      <FormGroupLabel htmlFor={name}>{fGLabel}</FormGroupLabel>
      <FormSelect id={name} name={name} onChange={onChange} onBlur={onBlur} ref={ref}>
        {options.map(({ label: oLabel, value }, index) => (
          <option value={value} key={index}>
            {oLabel}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  ),
);

FormGroupSelect.displayName = "FormGroupSelect";
