import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { styles } from "./styles";

export interface ControlledTextInputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
}

const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  control,
  name,
  placeholder,
  numberOfLines = 1,
  multiline = false,
  inputStyle,
  secureTextEntry = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          numberOfLines={numberOfLines}
          style={[styles.input, inputStyle]}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value || ""}
          placeholder={placeholder}
          multiline={multiline}
          textAlignVertical="top"
          secureTextEntry={secureTextEntry}
        />
      )}
    />
  );
};

export default ControlledTextInput;
