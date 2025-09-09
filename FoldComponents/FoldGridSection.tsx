import React from "react";
import { View } from "react-native";
import { tokens } from "../generated-tokens/tokens";
import { ChevronRightIcon } from "../BlueSkyIcons/ChevronRightIcon";
import { FoldGridTile, type FoldGridTileProps } from "./FoldGridTile";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

type FoldGridSectionProps = {
  title: string;
  onPress?: () => void;
  items: FoldGridTileProps[];
};

export const FoldGridSection = ({
  title,
  onPress,
  items,
}: FoldGridSectionProps) => {
  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.xl,
        paddingVertical: tokens.spacing["3xl"],
        gap: tokens.spacing.xxl,
      }}
    >
      <FoldPressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          gap: tokens.spacing.xs,
          alignItems: "center",
        }}
      >
        <FoldText type="header-md">{title}</FoldText>
        <ChevronRightIcon fill={tokens.face.tertiary} />
      </FoldPressable>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: tokens.spacing.md,
          justifyContent: "space-between", // Ensures spacing between columns
        }}
      >
        {/* Map your assets here */}
        {items?.map((item) => {
          return (
            <FoldGridTile
              key={item.title}
              imageUrl={item.imageUrl}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onPress={item.onPress}
            />
          );
        })}
      </View>
    </View>
  );
};
