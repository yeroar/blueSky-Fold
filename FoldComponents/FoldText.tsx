import React from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import type { FoldTextType } from "../../theme/typography/typography";

interface FoldTextProps extends TextProps {
  type: FoldTextType;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
}

export const FoldText = ({ type = "body-md", style, children, color, ...rest }: FoldTextProps) => {
  const theme = UnistylesRuntime.getTheme();

  const stylesCombined = [
    theme.typography[type],
    {
      color: color || theme.colors.face.primary,
    },
    style as TextStyle,
  ];

  return (
    <Text style={stylesCombined} {...rest}>
      {children}
    </Text>
  );
};
