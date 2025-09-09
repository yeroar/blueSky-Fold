import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  findNodeHandle,
  type LayoutRectangle,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
  type ViewStyle,
} from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { ChevronDownIcon } from "../primitives/icons";
import { FoldText } from "./FoldText";

export interface FoldDropdownProps {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    item: any;
  }[];
  value?: {
    label: string;
    item: any;
  };
  onSelect: (item: { label: string; item: any }) => void;
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
  labelStyles?: ViewStyle;
}

export const FoldDropdown: React.FC<FoldDropdownProps> = ({
  label,
  placeholder = "Select...",
  options,
  value,
  onSelect,
  containerStyles = {},
  inputStyles = {},
  labelStyles = {},
}) => {
  const theme = UnistylesRuntime.getTheme();

  const [open, setOpen] = useState(false);

  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle | null>(null);

  const [renderAbove, setRenderAbove] = useState(false);

  const buttonRef = useRef<View>(null);

  const gapBetweenInputAndDropdown = 8; // Space between input and dropdown

  const dropdownHeight = Math.min(options.length * 49, 300); // 49 per item, max 300

  const openDropdown = () => {
    const handle = findNodeHandle(buttonRef.current);

    if (handle) {
      UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get("window").height;

        const spaceBelow = screenHeight - (pageY + height);

        setRenderAbove(spaceBelow < dropdownHeight); // Flip if not enough room below

        setDropdownLayout({
          x: pageX,
          y: pageY + height,
          width,
          height,
        });

        setOpen(true);
      });
    }
  };

  const renderItem = ({ item }: { item: { label: string; item: string } }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(item);

          setOpen(false);
        }}
        style={styles.option}
      >
        <FoldText type={"body-sm"} style={styles.optionText}>
          {item?.label}
        </FoldText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        ...containerStyles,
      }}
    >
      {label && (
        <FoldText type={"body-md"} style={[styles.label, { ...labelStyles }]}>
          {label}
        </FoldText>
      )}

      {/* This view helps to avoid the 1 pixel jump from the focused border color being added */}
      <View
        style={{
          borderWidth: 1,
          borderColor: open ? theme.colors.border.focused : "transparent",
          borderRadius: 7,
        }}
      >
        <TouchableOpacity
          ref={buttonRef}
          onPress={openDropdown}
          style={[
            styles.dropdownButton,
            {
              ...inputStyles,
            },
            {
              borderColor: open
                ? theme.colors.border.focused
                : inputStyles?.borderColor || theme.colors.border.primary,
            },
          ]}
          activeOpacity={0.5}
        >
          <FoldText
            type={"body-md"}
            style={[!value && styles.placeholder, { flex: 1 }]}
            numberOfLines={1}
          >
            {value?.label || placeholder}
          </FoldText>

          <ChevronDownIcon />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={open} animationType="none" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay}>
            {dropdownLayout && (
              <View
                style={[
                  styles.dropdownList,
                  {
                    top: renderAbove
                      ? dropdownLayout.y -
                        dropdownHeight -
                        dropdownLayout.height -
                        gapBetweenInputAndDropdown
                      : dropdownLayout.y + gapBetweenInputAndDropdown,
                    left: dropdownLayout.x,
                    width: dropdownLayout.width,
                    height: dropdownHeight,
                  },
                ]}
              >
                <FlatList
                  data={options}
                  keyExtractor={(item) => item?.label}
                  nestedScrollEnabled
                  renderItem={renderItem}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  label: {
    marginBottom: 4,
    color: theme.colors.face.primary,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.layer.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    color: theme.colors.face.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownList: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.primary,
  },
  optionText: {
    color: theme.colors.face.secondary,
  },
}));
