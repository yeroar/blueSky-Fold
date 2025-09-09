import React from "react";
import {
  ActivityIndicator,
  Pressable,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FoldText } from "./FoldText";
import { tokens } from "../generated-tokens/tokens";

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
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    let releasedBackgroundColor =
      type === "primary"
        ? tokens.object.primary.bold.default
        : type === "secondary"
          ? tokens.object.secondary.default
          : "transparent";

    if (disabled) {
      releasedBackgroundColor = tokens.object.secondary.default; // No disabled state in tokens, using secondary
    }

    if (type === "tertiary") {
      releasedBackgroundColor = "transparent";
    }

    const pressedBackgroundColor =
      type === "primary"
        ? tokens.object.primary.bold.pressed
        : type === "secondary"
          ? tokens.object.secondary.pressed
          : tokens.object.secondary.pressed; // Using secondary for tertiary

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

  const spinnerColor = disabled ? tokens.face.primary : tokens.face.primary;

  return (
    <Animated.View
      style={[
        { width: fullWidth || loading !== undefined ? "100%" : "auto" },
        getContainerStyle(size),
        animatedStyle,
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        onPress={handleOnPress}
        style={getPressableStyle(size)}
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
                    fill={disabled ? tokens.face.disabled : tokens.face.primary}
                  />
                );
              })()}
            <FoldText
              type={size === "xs" ? "button-sm" : "button-lg"}
              style={[
                {
                  lineHeight: size === "xs" ? 16 : 20,
                },
                getTextStyle(type, disabled, hideUnderline),
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
                    fill={disabled ? tokens.face.disabled : tokens.face.primary}
                  />
                );
              })()}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = {
  innerWrapper: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    gap: 4,
  },
};

const getContainerStyle = (size: "xs" | "sm" | "md" | "lg") => ({
  alignSelf: "flex-start" as const,
  borderRadius: 12, // theme.radius.md equivalent
  justifyContent: "center" as const,
  alignItems: "center" as const,
  minWidth: size === "xs" ? 36 : size === "sm" ? 40 : size === "md" ? 48 : 56,
});

const getPressableStyle = (size: "xs" | "sm" | "md" | "lg") => ({
  width: "100%" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  paddingHorizontal:
    size === "xs"
      ? tokens.spacing.sm
      : size === "sm"
        ? tokens.spacing.md
        : size === "md"
          ? tokens.spacing.lg
          : tokens.spacing.xl,
  paddingVertical:
    size === "xs" ? 10 : size === "sm" ? 10 : size === "md" ? 14 : 18,
});

const getTextStyle = (
  type: "primary" | "secondary" | "tertiary",
  disabled: boolean,
  hideUnderline: boolean
) => ({
  includeFontPadding: false,
  textAlignVertical: "center" as const,
  color: disabled ? tokens.face.disabled : undefined,
  borderBottomWidth: type === "tertiary" && !hideUnderline ? 1 : 0,
  borderBottomColor: disabled ? tokens.face.disabled : tokens.face.primary,
});

export { FoldButton };
