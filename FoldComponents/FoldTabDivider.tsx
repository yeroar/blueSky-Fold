import React from "react";
import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

export const FoldTabDivider = () => {
  const theme = UnistylesRuntime.getTheme();

  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: theme.colors.border.tertiary,
      }}
    />
  );
};
