import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { tokens } from "../generated-tokens/tokens";
import { ChevronRightIcon } from "../BlueSkyIcons/ChevronRightIcon";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

type FoldProductFeatureTileProps = {
  label: string;
  message: string;
  actionText: string;
  actionOnPress: () => void;
};

export const FoldProductFeatureTile = ({
  label,
  message,
  actionText,
  actionOnPress,
}: FoldProductFeatureTileProps) => {
  const theme = UnistylesRuntime.getTheme();

  return (
    <View
      style={{
        backgroundColor: tokens.object.secondary.default,
        borderWidth: 1,
        borderColor: tokens.border.secondary,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 16,
          gap: 2,
        }}
      >
        <FoldText type="body-sm" color={tokens.face.tertiary}>
          {label}
        </FoldText>
        <FoldText type="body-sm">{message}</FoldText>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: tokens.border.secondary,
        }}
      />

      <FoldPressable
        onPress={actionOnPress}
        style={{
          paddingVertical: 20,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FoldText
          type="body-sm"
          color={tokens.face.accentBold}
          numberOfLines={1}
        >
          {actionText}
        </FoldText>
        <ChevronRightIcon
          fill={tokens.face.accentBold}
          width={16}
          height={16}
        />
      </FoldPressable>
    </View>
  );
};
