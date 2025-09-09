import { View } from "react-native";
import { tokens } from "../generated-tokens/tokens";
import { FoldButton } from "./FoldButton";
import { FoldText } from "./FoldText";

type FoldMarcomHeroTileProps = {
  title: string;
  onPress?: () => void;
};

export const FoldMarcomHeroTile = ({
  title,
  onPress,
}: FoldMarcomHeroTileProps) => {
  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.xl,
        paddingVertical: tokens.spacing.xxl,
      }}
    >
      <View
        style={{
          backgroundColor: tokens.object.accent.subtle.default,
          borderRadius: 16,
          paddingHorizontal: tokens.spacing.xl,
          paddingVertical: tokens.spacing.xxl,
          gap: tokens.spacing.md,
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
