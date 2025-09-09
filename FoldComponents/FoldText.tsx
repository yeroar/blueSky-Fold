import React from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native";
import { tokens } from "../generated-tokens/tokens";
import { tokens as typographyTokens } from "../generated-tokens/typography";

type FoldTextType = keyof typeof typographyTokens;

interface FoldTextProps extends TextProps {
  type: FoldTextType;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
}

export const FoldText = ({
  type = "body-md",
  style,
  children,
  color,
  ...rest
}: FoldTextProps) => {
  const stylesCombined = [
    typographyTokens[type],
    {
      color: color || tokens.face.primary,
    },
    style as TextStyle,
  ];

  return (
    <Text style={stylesCombined} {...rest}>
      {children}
    </Text>
  );
};
