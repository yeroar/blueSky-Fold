import React from "react";
import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { ChevronRightIcon } from "../primitives";
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
  const theme = UnistylesRuntime.getTheme();

  return (
    <FoldPressable
      disabled={!onPress}
      style={{
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing["3xl"],
        width: "100%",
      }}
    >
      <View
        style={{
          marginBottom: 4,
          flexDirection: "row",
          gap: 2,
        }}
      >
        <FoldText type="header-md">{title}</FoldText>
        {onPress && <ChevronRightIcon fill={theme.colors.face.tertiary} />}
      </View>
      <FoldText
        type="header-md"
        style={{
          marginBottom: subLabel1 || subLabel2 ? 12 : 0,
        }}
      >
        {value}
      </FoldText>

      {/* Progress bar */}
      {progress !== undefined && progress !== null && <FoldProgressBar progress={progress} />}

      {/* Bottom text */}
      {(subLabel1 || subLabel2) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <FoldText
            type="body-sm"
            style={{
              color: theme.colors.face.secondary,
            }}
          >
            {subLabel1}
          </FoldText>
          {subLabel2 && (
            <FoldText
              type="body-sm"
              style={{
                color: theme.colors.face.secondary,
              }}
            >
              {subLabel2}
            </FoldText>
          )}
        </View>
      )}

      {/* Footer */}
      {footerComponent && <View style={{ marginTop: 20 }}>{footerComponent}</View>}
    </FoldPressable>
  );
};
