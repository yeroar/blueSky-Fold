import React from "react";
import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { FoldButton } from "./FoldButton";
import { FoldText } from "./FoldText";

export const ALERT_MESSAGE_HEIGHT = 154; // If this changes we need to also change the FoldTabView

export const FoldAlertDialog = () => {
  const theme = UnistylesRuntime.getTheme();
  return (
    <View
      style={{
        height: ALERT_MESSAGE_HEIGHT,
        borderColor: theme.colors.border.secondary,
        borderWidth: 0.5,
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: theme.colors.object.secondary.default,
      }}
    >
      <FoldText
        type={"header-xxs"}
        style={{
          marginBottom: 6,
        }}
      >
        Titles are optional
      </FoldText>
      <FoldText
        type={"body-md"}
        numberOfLines={2}
        style={{
          marginBottom: 12,
          color: theme.colors.face.secondary,
        }}
      >
        Avoid people having to look in another location for more information.
      </FoldText>

      <FoldButton size="xs" text={"Action"} onPress={() => {}} />
    </View>
  );
};
