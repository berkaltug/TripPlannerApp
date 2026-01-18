import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { styles } from "./styles";

export interface ControlledTextInputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  numberOfLines?: number;
}

const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  control,
  name,
  placeholder,
  numberOfLines = 1,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          numberOfLines={numberOfLines}
          style={styles.input}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value || ""}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default ControlledTextInput;
