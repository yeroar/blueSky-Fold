import React from "react";
import { ActivityIndicator, Pressable, type TextStyle, View, type ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { FoldText } from "./FoldText";

const DURATION = 150 / 2;
const SCALE = {
  PRESSED: 0.97,
  RELEASED: 1,
};

/**
 * Props for the FoldButton component
 */
export interface FoldButtonProps {
  /** The text to display inside the button */
  text?: string;
  /** Callback function called when the button is pressed */
  onPress?: () => void;
  /** Custom styles to apply to the button container */
  style?: ViewStyle;
  /** Custom styles to apply to the button text */
  textStyle?: TextStyle;
  /** Whether the button is disabled and cannot be interacted with */
  disabled?: boolean;
  /**
   * The visual style variant of the button
   * - `primary`: Filled button with primary color background
   * - `secondary`: Button with secondary styling
   * - `tertiary`: Text button with optional underline
   */
  type?: "primary" | "secondary" | "tertiary";
  /**
   * The size of the button
   * - `xs`: Extra small (40px min-width, 16px icon)
   * - `sm`: Small (40px min-width, 20px icon)
   * - `md`: Medium (48px min-width, 20px icon)
   * - `lg`: Large (56px min-width, 20px icon)
   */
  size?: "xs" | "sm" | "md" | "lg";
  /** Icon component to display before the button text */
  leadingIcon?: React.JSX.ElementType;
  /** Icon component to display after the button text */
  trailingIcon?: React.JSX.ElementType;
  /** Whether to show a loading spinner instead of the button content, if true or false the button will be full width */
  loading?: boolean;
  /** Whether the button should take up the full width of its container */
  fullWidth?: boolean;
  /** Test identifier for automated testing */
  testID?: string;
  /** Whether to hide the underline on tertiary buttons */
  hideUnderline?: boolean;
}

/**
 * A customizable button component with support for different styles, sizes, icons, and loading states.
 *
 * Features animated press effects and follows the Fold design system.
 *
 * @example
 * ```tsx
 * // Basic primary button
 * <FoldButton
 *   text="Submit"
 *   onPress={() => console.log('Pressed')}
 * />
 *
 * // Secondary button with icon
 * <FoldButton
 *   text="Save"
 *   type="secondary"
 *   leadingIcon={SaveIcon}
 *   onPress={handleSave}
 * />
 *
 * // Loading state
 * <FoldButton
 *   text="Processing..."
 *   loading={true}
 *   disabled={true}
 * />
 *
 * // Tertiary button without underline
 * <FoldButton
 *   text="Cancel"
 *   type="tertiary"
 *   hideUnderline={true}
 *   onPress={handleCancel}
 * />
 * ```
 */
const FoldButton = ({
  text = "Fold Button",
  onPress,
  style,
  disabled = false,
  type = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  textStyle = {},
  loading = undefined,
  fullWidth = false,
  testID,
  hideUnderline = false,
}: FoldButtonProps) => {
  const theme = UnistylesRuntime.getTheme();

  styles.useVariants({
    size,
    isDisabled: disabled,
    hideUnderline,
  });

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    let releasedBackgroundColor =
      type === "primary"
        ? theme.colors.object.primary.bold.default
        : type === "secondary"
          ? theme.colors.object.secondary.default
          : "transparent";

    if (disabled) {
      releasedBackgroundColor = theme.colors.object.disabled.disabled;
    }

    if (type === "tertiary") {
      releasedBackgroundColor = "transparent";
    }

    const pressedBackgroundColor =
      type === "primary"
        ? theme.colors.object.primary.bold.pressed
        : type === "secondary"
          ? theme.colors.object.secondary.pressed
          : theme.colors.object.tertiary.pressed;

    return {
      transform: [{ scale: scale.value }],

      backgroundColor: interpolateColor(
        scale.value,
        [SCALE.PRESSED, SCALE.RELEASED],
        [pressedBackgroundColor, releasedBackgroundColor]
      ),
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(SCALE.PRESSED, {
      duration: DURATION,
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(SCALE.RELEASED, {
      duration: DURATION,
    });
  };

  const handleOnPress = () => {
    if (onPress && !disabled && !loading) {
      onPress();
    }
  };

  const spinnerColor = disabled ? theme.colors.face.primary : theme.colors.face.primary;

  return (
    <Animated.View
      style={[
        { width: fullWidth || loading !== undefined ? "100%" : "auto" },
        styles.container,
        animatedStyle,
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        onPress={handleOnPress}
        style={styles.pressableBase}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator size={16} color={spinnerColor} />
        ) : (
          <View style={styles.innerWrapper}>
            {leadingIcon &&
              (() => {
                const LeadingIcon = leadingIcon;
                return (
                  <LeadingIcon
                    width={size === "xs" ? 16 : 20}
                    height={size === "xs" ? 16 : 20}
                    fill={disabled ? theme.colors.face.disabled : theme.colors.face.primary}
                  />
                );
              })()}
            <FoldText
              type={size === "xs" ? "button-sm" : "button-lg"}
              style={[
                {
                  lineHeight: size === "xs" ? 16 : 20,
                },
                styles.textBase,
                textStyle,
              ]}
            >
              {text}
            </FoldText>
            {trailingIcon &&
              (() => {
                const TrailingIcon = trailingIcon;
                return (
                  <TrailingIcon
                    width={size === "xs" ? 16 : 20}
                    height={size === "xs" ? 16 : 20}
                    fill={disabled ? theme.colors.face.disabled : theme.colors.face.primary}
                  />
                );
              })()}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => {
  return {
    innerWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    textBase: {
      includeFontPadding: false,
      textAlignVertical: "center",
      variants: {
        isDisabled: {
          true: {
            color: theme.colors.face.disabled,
          },
        },
        type: {
          tertiary: {
            // No borderBottomWidth here
            borderBottomColor: theme.colors.face.primary,
          },
        },
        hideUnderline: {
          true: {
            borderBottomWidth: 0,
          },
        },
      },
      compoundVariants: [
        {
          type: "tertiary",
          hideUnderline: false,
          styles: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.face.primary,
          },
        },
        {
          type: "tertiary",
          isDisabled: true,
          styles: {
            borderBottomColor: theme.colors.face.disabled,
          },
        },
      ],
    },
    pressableBase: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      variants: {
        isDisabled: {
          true: {},
          false: {},
        },
        size: {
          xs: {
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 10,
          },
          sm: {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: 10,
          },
          md: {
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: 14,
          },
          lg: {
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: 18,
          },
        },
      },
    },
    container: {
      alignSelf: "flex-start",
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",

      variants: {
        isDisabled: {
          true: {},
          false: {},
        },
        size: {
          xs: {
            minWidth: 36,
          },
          sm: {
            minWidth: 40,
          },
          md: {
            minWidth: 48,
          },
          lg: {
            minWidth: 56,
          },
        },
      },
    },
  };
});

export { FoldButton };
