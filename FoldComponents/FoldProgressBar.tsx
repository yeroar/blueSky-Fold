import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { tokens } from "../generated-tokens/tokens";

type FoldProgressBarProps = {
  progress: number; // Number 1-100
};

export const FoldProgressBar = ({ progress }: FoldProgressBarProps) => {
  const theme = UnistylesRuntime.getTheme();

  return (
    <View
      style={{
        height: 8,
        borderRadius: 100,
        backgroundColor: tokens.object.secondary.default,
        borderWidth: 0.5,
        borderColor: tokens.border.tertiary,
      }}
    >
      <View
        style={{
          height: 8,
          borderRadius: 100,
          backgroundColor: tokens.object.primary.bold.default,
          width: `${progress}%`,
        }}
      />
    </View>
  );
};
