import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  findNodeHandle,
  Keyboard,
  type LayoutRectangle,
  Text,
  TextInput,
  UIManager,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

export interface FoldDropdownInputProps {
  options: {
    label: string;
    item: any;
  }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  containerStyles?: object;
  label?: string;
  value: string;
  onTextChange: (text: string) => void;
  onSubmitEditing?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
  onDropdownOpen?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
}

export const FoldDropdownInput = forwardRef((props: FoldDropdownInputProps, ref) => {
  const inputRef = useRef(null);

  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const containerRef = useRef<View>(null);

  const options = props.options || [];

  const gapBetweenInputAndDropdown = 8; // Space between input and dropdown

  const [inputHeight, setInputHeight] = useState(0);

  const onChange = (text: string, forceClose?: boolean) => {
    props?.onTextChange(text);

    if (text.length > 0 && !forceClose) {
      // setFilteredOptions(options)
      openDropdown(true);
    } else {
      closeDropdown();
    }
  };

  const openDropdown = async (animateToTop?: boolean) => {
    if (props?.onDropdownOpen && animateToTop) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for the input to focus

      props?.onDropdownOpen();

      // Wait 100ms to ensure the input is focused before measuring
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const handle = findNodeHandle(inputRef.current);

    if (handle) {
      UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
        setLayout({ x: pageX, y: pageY + height, width, height });

        props.setOpen?.(true);
      });
    }
  };

  useImperativeHandle(ref, () => ({
    open: openDropdown,
    close: closeDropdown,
    measureLayout: (
      relativeToNativeNode: number,
      onSuccess: (x: number, y: number, width: number, height: number) => void,
      onFail?: () => void
    ) => {
      containerRef.current?.measureLayout(relativeToNativeNode, onSuccess, onFail);
    },
  }));

  const closeDropdown = () => {
    props.setOpen?.(false);
  };

  const onSelect = (item: { label: string; item: any }) => {
    onChange(item?.label, true);

    closeDropdown();

    props.onSelect(item?.item);

    Keyboard.dismiss();
  };

  return (
    <>
      <View
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "visible",
          width: "100%",
          ...(props?.containerStyles || {}),
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;

          setInputHeight(height);
        }}
      >
        {props?.label && (
          <FoldText
            type="body-md-bold"
            style={{
              marginBottom: 8,
            }}
          >
            {props?.label}
          </FoldText>
        )}

        <View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={props.value}
            onChangeText={onChange}
            placeholder={props?.placeholder}
            onFocus={() => {
              openDropdown(true);
            }}
            autoCapitalize="none"
            keyboardType={props?.keyboardType || "default"}
            autoCorrect={false}
            returnKeyType={props?.returnKeyType || "done"}
            onBlur={() => {
              if (!props?.open) {
                closeDropdown();
              }
            }}
            onSubmitEditing={props.onSubmitEditing}
          />

          {props.loading && (
            <View style={{ position: "absolute", right: 16, top: 16 }}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
      </View>

      {props.open && layout && (options ?? [])?.length > 0 && (
        <FoldPressable
          onPressOut={(e) => {
            // If the user taps outside the dropdown (but not on dropdown items), close it
            const touchY = e.nativeEvent.pageY;

            if (touchY < layout.y || touchY > layout.y + 250) {
              closeDropdown();

              Keyboard.dismiss();
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            opacity: 1,
          }}
        >
          <View
            style={[
              styles.dropdown,
              {
                top: gapBetweenInputAndDropdown + inputHeight,
                width: layout.width,
                maxHeight: 250,
              },
            ]}
          >
            <FlatList
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              data={options}
              keyExtractor={(item, index) => item?.label + index}
              renderItem={({ item }) => (
                <FoldPressable onPress={() => onSelect(item)} style={styles.option}>
                  <Text>{item?.label}</Text>
                </FoldPressable>
              )}
            />
          </View>
        </FoldPressable>
      )}
    </>
  );
});

const styles = StyleSheet.create((theme) => ({
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 6,

    alignItems: "center",
    borderColor: theme.colors.border.primary,
    backgroundColor: theme.colors.layer.background,
    height: 52,

    // margin: 16
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.primary,
    zIndex: 40000,
    pointerEvents: "auto",
  },
}));
