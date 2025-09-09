import React from "react";
import { Dimensions, View } from "react-native";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

type FoldHeaderProps = {
  title?: string;
  subTitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  rightIconColor?: string;
  titleColor?: string;
  currentStep?: number;
  totalSteps?: number;
  headerHeight?: number;
};

const FoldHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  leftComponent,
  rightComponent,
  backgroundColor,
  titleColor,
  currentStep,
  totalSteps,
  headerHeight,
}: FoldHeaderProps) => {
  const HEADER_HEIGHT = headerHeight || 48;

  const containerPaddingVertical = 4;

  const containerPaddingHorizontal = 20;

  const gap = 4;

  // Keeping this here if we want to add the progress stuff later
  // const progress = useSharedValue<number>((currentStep || 0) - 1); // minus 1 because the first step is 0 to match the index

  const [rightSideWidth, setRightSideWidth] = React.useState(0);

  const [leftSideWidth, setLeftSideWidth] = React.useState(0);

  const iconStyles = {
    padding: 8,
  };

  const showProgressBar = currentStep !== undefined && totalSteps !== undefined;

  const headerTextColor = titleColor || "red"; // TODO: add the real color here once josh gets back to figma

  const headerMaxWidth =
    Dimensions.get("window").width -
    leftSideWidth -
    rightSideWidth -
    containerPaddingHorizontal - // do it twice once for each side
    containerPaddingHorizontal -
    gap -
    45; // Random number that seems to work well for most devices

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: backgroundColor || "transparent",
        height: HEADER_HEIGHT,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center part */}
      <View
        style={[
          {
            alignItems: "center",
            gap: gap,
            marginVertical: containerPaddingVertical,
          },
          showProgressBar
            ? {
                width: headerMaxWidth,
              }
            : {
                maxWidth: headerMaxWidth,
              },
        ]}
      >
        {showProgressBar ? // Waiting for implementation
        // <Pagination.Basic<{ color: string }>
        //   progress={progress}
        //   data={Array.from({ length: totalSteps }, (_, i) => ({ color: colors.lighterYellow }))}
        //   dotStyle={{
        //     width: (headerMaxWidth - 24) / totalSteps - 4, // Adjusted to fit within the header
        //     height: 4,
        //     backgroundColor: colors.lighterYellow,
        //     borderRadius: 100
        //   }}
        //   activeDotStyle={{
        //     overflow: 'hidden',
        //     backgroundColor: colors.pressedYellow
        //   }}
        //   containerStyle={{
        //     gap: 4
        //   }}
        //   horizontal
        //   // onPress={() => {}}
        // />
        null : (
          <FoldText
            type="header-xl"
            numberOfLines={2}
            style={{
              textAlign: "center",
              color: titleColor || headerTextColor,
            }}
          >
            {title}
          </FoldText>
        )}
      </View>

      {/* Left side */}
      <View
        onLayout={(event) => {
          setLeftSideWidth(event.nativeEvent.layout.width);
        }}
        style={{
          alignItems: "flex-start",
          position: "absolute",
          left: 0,
          marginLeft: containerPaddingHorizontal,
          marginVertical: containerPaddingVertical,
          backgroundColor: backgroundColor || "transparent",
        }}
      >
        {leftComponent ||
          (leftIcon && onLeftPress && (
            <FoldPressable style={iconStyles} onPress={onLeftPress}>
              {/* <FoldIcon
                name={leftIcon}
                size={20}
                color={headerTextColor}
                weight={300}
              /> */}
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "red",
                }}
              />
            </FoldPressable>
          ))}
      </View>

      {/* Right side */}
      <View
        onLayout={(event) => {
          setRightSideWidth(event.nativeEvent.layout.width);
        }}
        style={{
          alignItems: "flex-end",
          position: "absolute",
          right: 0,
          marginRight: containerPaddingHorizontal,
          marginVertical: containerPaddingVertical,
          backgroundColor: backgroundColor || "transparent",
        }}
      >
        {rightComponent ||
          (rightIcon && onRightPress && (
            <FoldPressable style={iconStyles} onPress={onRightPress}>
              {/* <FoldIcon
                name={rightIcon}
                size={20}
                color={rightIconColor || themeColors.text}
                weight={300}
              /> */}
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "red",
                }}
              />
            </FoldPressable>
          ))}
      </View>
    </View>
  );
};

export default FoldHeader;
