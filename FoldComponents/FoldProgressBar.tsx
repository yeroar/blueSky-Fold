import { View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

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
        backgroundColor: theme.colors.object.secondary.default,
        borderWidth: 0.5,
        borderColor: theme.colors.border.tertiary,
      }}
    >
      <View
        style={{
          height: 8,
          borderRadius: 100,
          backgroundColor: theme.colors.object.primary.bold.default,
          width: `${progress}%`,
        }}
      />
    </View>
  );
};
