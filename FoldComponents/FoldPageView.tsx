import { useRouter } from "expo-router";
import React, { use, useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  RefreshControl,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { tokens } from "../generated-tokens/tokens";
import { ArrowNarrowLeftIcon } from "../BlueSkyIcons/ArrowNarrowLeftIcon";
import { ChevronLeftIcon } from "../BlueSkyIcons/ChevronLeftIcon";
import { XCloseIcon } from "../BlueSkyIcons/XCloseIcon";
import FoldHeader from "./FoldHeader";
import { FoldPressable } from "./FoldPressable";

type FoldPageViewProps = {
  children: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  footerComponent?: React.ReactNode;
  title?: string;
  hideBackButton?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  hideFooterGradient?: boolean;
  currentStep?: number;
  totalSteps?: number;
  scrollRef?: React.Ref<any>;
  leftFunction?: () => void;
  stickyFooterEnabled?: boolean;
  scrollEnabled?: boolean;
  chevronBackIcon?: boolean;
  closeBackIcon?: boolean;
};

const HEADER_HEIGHT = 48;

export const FoldPageView = ({
  children,
  onRefresh,
  refreshing,
  style,
  contentContainerStyle,
  footerComponent,
  scrollEnabled = true,
  title,
  hideBackButton = false,
  leftComponent,
  rightComponent,
  hideFooterGradient = false,
  // currentStep,
  // totalSteps,
  scrollRef,
  leftFunction,
  stickyFooterEnabled = true,
  chevronBackIcon = false,
  closeBackIcon = false,
}: FoldPageViewProps) => {
  const router = useRouter();

  const insets = useSafeAreaInsets();
  const theme = UnistylesRuntime.getTheme();

  const scrollY = useRef(new Animated.Value(0)).current;

  const prevScrollY = useRef(0);

  const headerOffset = useRef(new Animated.Value(0)).current;

  const [footerHeight, setFooterHeight] = React.useState(0);

  const animatedBottom = useRef(new Animated.Value(insets.bottom)).current;

  // Listen to scroll events
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentY = event.nativeEvent.contentOffset.y;

        const diff = currentY - prevScrollY.current;

        // Ignore negative bounce
        if (currentY <= 0) {
          headerOffset.setValue(0);

          prevScrollY.current = 0;

          return;
        }

        // Scrolling down
        if (diff > 0) {
          headerOffset.setValue(
            Math.min(HEADER_HEIGHT, (headerOffset as any)._value + diff)
          );
        }
        // Scrolling up
        else if (diff < 0) {
          headerOffset.setValue(
            Math.max(0, (headerOffset as any)._value + diff)
          );
        }

        prevScrollY.current = currentY;
      },
    }
  );

  const headerTranslateY = Animated.multiply(headerOffset, -1);

  const headerOpacity = headerOffset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const borderOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 10],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const defaultLeftHeaderComponent = () => {
    return (
      <FoldPressable
        onPress={() => {
          if (leftFunction) {
            leftFunction();
          } else {
            router.back();
          }
        }}
        hitSlop={4}
      >
        {chevronBackIcon && <ChevronLeftIcon />}
        {closeBackIcon && <XCloseIcon />}
        {!chevronBackIcon && !closeBackIcon && <ArrowNarrowLeftIcon />}
      </FoldPressable>
    );
  };

  const defaultRightHeaderComponent = () => {
    return null;
  };

  // To track the keyboard visibility
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(animatedBottom, {
        toValue: 0,
        duration: e?.duration || 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(animatedBottom, {
        toValue: insets.bottom,
        duration: e?.duration || 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();

      hideSub.remove();
    };
  }, []);

  return (
    <View style={[styles.container]}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            // transform: [{ translateY: headerTranslateY }], // Commenting these out per joshes request. Can add them back if we want head animations
            paddingTop: insets.top,
            height: HEADER_HEIGHT + insets.top,
            // opacity: headerOpacity // Commenting these out per joshes request. Can add them back if we want head animations
          },
        ]}
      >
        <FoldHeader
          title={title || undefined}
          leftComponent={leftComponent || defaultLeftHeaderComponent()}
          rightComponent={rightComponent || defaultRightHeaderComponent()}
          headerHeight={HEADER_HEIGHT}
        />

        {/* Divider line */}
        <Animated.View
          style={[
            styles.divider,
            {
              opacity: borderOpacity,
            },
          ]}
        />
      </Animated.View>

      {/* Scrollable content */}
      <KeyboardAwareScrollView
        ref={scrollRef}
        ScrollViewComponent={Animated.ScrollView as any}
        scrollEnabled={scrollEnabled}
        bottomOffset={footerHeight + 16}
        style={{
          flex: 1,
          marginBottom: footerComponent ? insets.bottom : undefined,
          ...style,
        }}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + insets.top + 16,
          paddingHorizontal: tokens.spacing.xl,
          paddingBottom: insets.bottom + footerHeight + 16,

          ...((contentContainerStyle as any) || {}),
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        scrollEventThrottle={16}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh && refreshing !== undefined ? (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              progressViewOffset={insets?.top + HEADER_HEIGHT}
            />
          ) : undefined
        }
      >
        {children}
      </KeyboardAwareScrollView>

      {/* Bottom footer area */}
      {footerComponent && (
        <KeyboardStickyView
          offset={{ closed: 0, opened: 0 }}
          enabled={stickyFooterEnabled}
        >
          <Animated.View
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;

              if (height !== footerHeight) {
                setFooterHeight(height);
              }
            }}
            style={{
              position: "absolute",
              bottom: animatedBottom,
              left: 0,
              right: 0,
            }}
          >
            <View style={{ position: "relative", padding: 16 }}>
              {/* Background gradient */}
              {/* {!hideFooterGradient && (
                <LinearGradient
                  colors={["#FCFAF2", "rgba(252, 250, 242, 0)"]}
                  locations={[0.3077, 1]}
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    zIndex: -1,
                  }}
                />
              )} */}

              {/* Actual footer content */}
              {footerComponent}
            </View>
          </Animated.View>
        </KeyboardStickyView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.layer.background,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: tokens.layer.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  headerText: {
    fontWeight: "bold",
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
});
