import React from "react";
import { Image, View } from "react-native";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";
import { tokens } from "../generated-tokens/tokens";

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
  return (
    <FoldPressable
      onPress={onPress}
      style={{
        width: "48%", // 2 columns with gap
        marginBottom: 4, // Space between rows
        padding: tokens.spacing.lg,
        gap: tokens.spacing.lg,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: tokens.border.tertiary,
        backgroundColor: tokens.object.secondary.default, // Using secondary instead of tertiary
      }}
    >
      {icon && (
        <View
          style={{
            borderRadius: 10,
            padding: tokens.spacing.sm,
            backgroundColor: tokens.object.primary.bold.default,
            alignSelf: "flex-start",
          }}
        >
          {icon}
        </View>
      )}
      {imageUrl && (
        <View style={{}}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
        </View>
      )}

      <View
        style={{
          gap: tokens.spacing.xs,
        }}
      >
        <FoldText type={"body-md-bold"}>{title}</FoldText>
        <FoldText type={"body-sm-bold"} color={tokens.face.accentBold}>
          {description}
        </FoldText>
      </View>
    </FoldPressable>
  );
};
