import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { ClockIcon, MenuIcon, NotificationMessageIcon } from "../primitives/icons";
import { ALERT_MESSAGE_HEIGHT } from "./FoldAlertDialog";
import FoldHeader from "./FoldHeader";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

type FoldTabViewProps = {
  children: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  foldAlertDialog?: React.ReactNode;
};

const HEADER_HEIGHT = 58;

export const FoldTabView = ({
  children,
  onRefresh,
  refreshing,
  style,
  contentContainerStyle,
  title,
  leftComponent,
  rightComponent,
  foldAlertDialog,
}: FoldTabViewProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = UnistylesRuntime.getTheme();

  const scrollY = useRef(new Animated.Value(0)).current;

  const prevScrollY = useRef(0);

  const headerOffset = useRef(new Animated.Value(0)).current;

  const FINAL_HEADER_TO_USE =
    HEADER_HEIGHT + (foldAlertDialog !== undefined ? ALERT_MESSAGE_HEIGHT + 12 : 0); // 12 is for the padding bottom

  // Listen to scroll events
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
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
        headerOffset.setValue(Math.min(FINAL_HEADER_TO_USE, (headerOffset as any)._value + diff));
      }
      // Scrolling up
      else if (diff < 0) {
        headerOffset.setValue(Math.max(0, (headerOffset as any)._value + diff));
      }

      prevScrollY.current = currentY;
    },
  });

  //   Keeping this here incase we want header animations. At this time we do not
  //   const headerTranslateY = Animated.multiply(headerOffset, -1);

  //   const headerOpacity = headerOffset.interpolate({
  //     inputRange: [0, HEADER_HEIGHT],
  //     outputRange: [1, 0],
  //     extrapolate: "clamp",
  //   });

  const borderOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 10],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const defaultLeftHeaderComponent = () => {
    return (
      <FoldPressable
        onPress={() => {
          router.push("/SettingsScreen");
        }}
        hitSlop={4}
      >
        <MenuIcon />
      </FoldPressable>
    );
  };

  const defaultRightHeaderComponent = () => {
    return (
      <View
        style={{
          gap: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FoldPressable
          style={{
            borderRadius: 4,
            backgroundColor: theme.colors.object.primary.bold.default,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          onPress={() => {
            router?.push("/(dev)/ComponentLibrary");
          }}
          hitSlop={4}
        >
          <FoldText type={"body-sm-bold"}>Earn 2%</FoldText>
        </FoldPressable>
        <FoldPressable
          onPress={() => {
            router.push("/RightDrawer");
          }}
          hitSlop={4}
        >
          <ClockIcon />
        </FoldPressable>
        <FoldPressable
          onPress={() => {
            router.push("/RightDrawer");
          }}
          hitSlop={4}
        >
          <NotificationMessageIcon />
        </FoldPressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            // transform: [{ translateY: headerTranslateY }], // Commenting these out per joshes request. Can add them back if we want header animations
            paddingTop: insets.top,
            height: FINAL_HEADER_TO_USE + insets.top,
            // opacity: headerOpacity // Commenting these out per joshes request. Can add them back if we want header animations,
            // borderWidth: 1,
            // borderColor: "red",
          },
        ]}
      >
        <FoldHeader
          title={title || undefined}
          leftComponent={leftComponent || defaultLeftHeaderComponent()}
          rightComponent={rightComponent || defaultRightHeaderComponent()}
          headerHeight={HEADER_HEIGHT}
        />

        {/* Alert message */}
        {foldAlertDialog && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 12,
            }}
          >
            {foldAlertDialog}
          </View>
        )}

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
      <Animated.ScrollView
        style={{
          flex: 1,
          ...style,
        }}
        contentContainerStyle={{
          paddingTop: FINAL_HEADER_TO_USE + insets.top,
          ...((contentContainerStyle as any) || {}),
        }}
        scrollEventThrottle={16}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh && refreshing !== undefined ? (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              progressViewOffset={insets?.top + FINAL_HEADER_TO_USE}
            />
          ) : undefined
        }
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: { flex: 1, backgroundColor: theme.colors.layer.background },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.layer.background,
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
}));
