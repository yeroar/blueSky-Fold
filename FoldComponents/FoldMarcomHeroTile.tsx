import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { FoldButton } from "./FoldButton";
import { FoldText } from "./FoldText";

type FoldMarcomHeroTileProps = {
  title: string;
  onPress?: () => void;
};

export const FoldMarcomHeroTile = ({ title, onPress }: FoldMarcomHeroTileProps) => {
  const theme = UnistylesRuntime.getTheme();
  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.xxl,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.object.accent.subtle.default,
          borderRadius: 16,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.xxl,
          gap: theme.spacing.md,
          height: 376,
          justifyContent: "flex-end",
        }}
      >
        <FoldText type={"header-md"}>{title}</FoldText>
        <FoldButton type={"secondary"} text="Action" onPress={onPress} />
      </View>
    </View>
  );
};
