import React from "react";
import { View } from "react-native";
import { tokens } from "../generated-tokens/tokens";
import { ChevronRightIcon } from "../BlueSkyIcons/ChevronRightIcon";
import { FoldPressable } from "./FoldPressable";
import { FoldProgressBar } from "./FoldProgressBar";
import { FoldText } from "./FoldText";

type FoldTileProps = {
  title: string;
  value: string;
  progress?: number | undefined; // Number 1-100
  footerComponent?: React.ReactNode;
  onPress?: () => void;
  subLabel1?: string;
  subLabel2?: string;
};

export const FoldTile = ({
  title,
  value,
  progress,
  footerComponent,
  onPress,
  subLabel1,
  subLabel2,
}: FoldTileProps) => {
  return (
    <FoldPressable
      disabled={!onPress}
      style={{
        paddingHorizontal: tokens.spacing.xl,
        paddingVertical: tokens.spacing["3xl"],
        width: "100%",
      }}
    >
      <View
        style={{
          marginBottom: 4,
          flexDirection: "row",
          gap: tokens.spacing.xs,
        }}
      >
        <FoldText type="header-md">{title}</FoldText>
        {onPress && <ChevronRightIcon fill={tokens.face.tertiary} />}
      </View>
      <FoldText
        type="header-md"
        style={{
          marginBottom: subLabel1 || subLabel2 ? tokens.spacing.md : 0,
        }}
      >
        {value}
      </FoldText>

      {/* Progress bar */}
      {progress !== undefined && progress !== null && (
        <FoldProgressBar progress={progress} />
      )}

      {/* Bottom text */}
      {(subLabel1 || subLabel2) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: tokens.spacing.sm,
          }}
        >
          <FoldText
            type="body-sm"
            style={{
              color: tokens.face.secondary,
            }}
          >
            {subLabel1}
          </FoldText>
          {subLabel2 && (
            <FoldText
              type="body-sm"
              style={{
                color: tokens.face.secondary,
              }}
            >
              {subLabel2}
            </FoldText>
          )}
        </View>
      )}

      {/* Footer */}
      {footerComponent && (
        <View style={{ marginTop: tokens.spacing.xl }}>{footerComponent}</View>
      )}
    </FoldPressable>
  );
};
