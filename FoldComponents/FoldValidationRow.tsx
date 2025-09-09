import React from "react";
import { View } from "react-native";
import { CheckCircleIcon } from "../BlueSkyIcons/CheckCircleIcon";
import { XCircleIcon } from "../BlueSkyIcons/XCircleIcon";
import { FoldText } from "./FoldText";

type FoldValidationRowProps = {
  status: "valid" | "invalid";
  text: string;
  iconSize?: number;
};

export const FoldValidationRow = ({
  status,
  text,
  iconSize = 24,
}: FoldValidationRowProps) => {
  // const theme = UnistylesRuntime.getTheme();

  // TODO: Fix the color codes when we import colors

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {status === "valid" ? (
        <CheckCircleIcon fill={"#1A6F6F"} width={iconSize} height={iconSize} />
      ) : (
        <XCircleIcon fill={"#C9372C"} width={iconSize} height={iconSize} />
      )}

      <FoldText type="body-sm" style={{ color: "#454F59", flex: 1 }}>
        {text}
      </FoldText>
    </View>
  );
};
