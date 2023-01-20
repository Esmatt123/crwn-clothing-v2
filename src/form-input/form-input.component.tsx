import { FC } from "react";
import { InputHTMLAttributes } from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = {
  label: string;
  inputOptions: {
    type: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required: boolean;
    value: string;
  };
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            inputOptions.value &&
              typeof inputOptions.value === "string" &&
              inputOptions.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
