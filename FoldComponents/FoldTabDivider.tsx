import React from "react";
import { View } from "react-native";
import { tokens } from "../generated-tokens/tokens";

export const FoldTabDivider = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: tokens.border.tertiary,
      }}
    />
  );
};
