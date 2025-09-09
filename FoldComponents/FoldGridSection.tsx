import React from "react";
import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { ChevronRightIcon } from "../primitives";
import { FoldGridTile, type FoldGridTileProps } from "./FoldGridTile";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

type FoldGridSectionProps = {
  title: string;
  onPress?: () => void;
  items: FoldGridTileProps[];
};

export const FoldGridSection = ({ title, onPress, items }: FoldGridSectionProps) => {
  const theme = UnistylesRuntime.getTheme();
  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing["3xl"],
        gap: theme.spacing.xxl,
      }}
    >
      <FoldPressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <FoldText type="header-md">{title}</FoldText>
        <ChevronRightIcon fill={theme.colors.face.tertiary} />
      </FoldPressable>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.md,
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
