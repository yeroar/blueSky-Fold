import React, { forwardRef } from "react";
import { type TextStyle, View, type ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { FoldText } from "./FoldText";

export interface FoldInputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  placeholder?: string;
  placeHolderTextColor?: string;
  value: string;
  onTextChange?: (text: string) => void;
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  labelStyle?: TextStyle;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  autoFocus?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputContainerStyle?: ViewStyle;
  onSubmitEditing?: () => void;
  footerComponent?: React.ReactNode;
  ref?: React.Ref<TextInput>;
  optional?: boolean; // Optional prop to indicate if the input is optional
}

const FoldInput = forwardRef<TextInput, FoldInputProps>(
  (
    {
      label,
      placeholder,
      placeHolderTextColor,
      value,
      onTextChange,
      containerStyle,
      textInputStyle,
      labelStyle,
      keyboardType = "default",
      secureTextEntry = false,
      autoCapitalize = "none",
      autoCorrect = false,
      returnKeyType = "done",
      autoFocus = false,
      leftIcon,
      rightIcon,
      inputContainerStyle,
      onSubmitEditing,
      footerComponent,
      optional,
      ...rest
    },
    ref
  ) => {
    const theme = UnistylesRuntime.getTheme();

    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <FoldText type="body-md-bold" style={[styles.label, labelStyle]}>
            {label}

            {optional && (
              <FoldText
                type={"body-md-bold"}
                style={[
                  styles.label,
                  {
                    color: theme.colors.face.secondary,
                  },
                  labelStyle,
                ]}
              >
                {` (optional)`}
              </FoldText>
            )}
          </FoldText>
        )}

        <View
          style={[
            styles.inputWrapper,
            isFocused && { borderColor: theme.colors.border.focused, borderWidth: 2 },
            inputContainerStyle,
          ]}
        >
          {leftIcon && <View>{leftIcon}</View>}

          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={placeHolderTextColor}
            value={value}
            onChangeText={onTextChange}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            returnKeyType={returnKeyType}
            autoFocus={autoFocus}
            style={[styles.input, textInputStyle]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={onSubmitEditing}
            {...rest}
          />

          {rightIcon && <View>{rightIcon}</View>}
        </View>

        {footerComponent}
      </View>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.border.primary,
    backgroundColor: theme.colors.layer.background,
    paddingHorizontal: 12,
    height: 52,
    gap: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "Geist",
    fontWeight: "400",
    letterSpacing: 0.14,
  },
}));

export default FoldInput;
