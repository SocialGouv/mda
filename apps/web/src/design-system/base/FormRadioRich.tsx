import { type ReactNode } from "react";

export const FormRadioRich = ({
  id,
  checked,
  label,
  hint,
  onChange,
  onClick,
  img,
}: {
  checked?: boolean;
  hint?: string;
  id: string;
  img?: ReactNode;
  label: string;
  onChange?: () => void;
  onClick?: () => void;
}) => {
  return (
    <div className="fr-radio-group fr-radio-rich">
      <input
        checked={checked}
        value="light"
        type="radio"
        id={id}
        name="fr-radios-theme"
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={id} className="fr-label">
        {label}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      {img && <div className="fr-radio-rich__img">{img}</div>}
    </div>
  );
};
