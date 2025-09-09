import React from "react";
import { Image, View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

export type FoldGridTileProps = {
  imageUrl?: string;
  icon?: React.JSX.Element;
  title: string;
  description: string;
  onPress?: () => void;
};

export const FoldGridTile = ({
  imageUrl,
  title,
  description,
  onPress,
  icon,
}: FoldGridTileProps) => {
  const theme = UnistylesRuntime.getTheme();
  return (
    <FoldPressable
      onPress={onPress}
      style={{
        width: "48%", // 2 columns with gap
        marginBottom: 4, // Space between rows
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: theme.colors.border.tertiary,
        backgroundColor: theme.colors.object.tertiary.default,
      }}
    >
      {icon && (
        <View
          style={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: theme.colors.object.primary.bold.default,
            alignSelf: "flex-start",
          }}
        >
          {icon}
        </View>
      )}
      {imageUrl && (
        <View style={{}}>
          <Image source={{ uri: imageUrl }} style={{ width: 40, height: 40, borderRadius: 10 }} />
        </View>
      )}

      <View
        style={{
          gap: 4,
        }}
      >
        <FoldText type={"body-md-bold"}>{title}</FoldText>
        <FoldText type={"body-sm-bold"} color={theme.colors.face.accentBold}>
          {description}
        </FoldText>
      </View>
    </FoldPressable>
  );
};
