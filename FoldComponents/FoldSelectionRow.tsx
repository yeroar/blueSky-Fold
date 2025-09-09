import React from "react";
import { Linking, View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { tokens } from "../generated-tokens/tokens";
import { CheckCircleIcon } from "../BlueSkyIcons/CheckCircleIcon";
import { CircleIcon } from "../BlueSkyIcons/CircleIcon";
import { FoldPressable } from "./FoldPressable";
import { FoldText } from "./FoldText";

interface FoldSelectionRowProps {
  options: {
    id: number;
    text: string;
    linkText?: string;
    linkUrl?: string;
    linkMap?: {
      [key: string]: string;
    };
  }[];
  selectedOptions: number[];
  onToggle: (id: number) => void;
}

export const FoldSelectionRow: React.FC<FoldSelectionRowProps> = ({
  options,
  selectedOptions,
  onToggle,
}) => {
  const theme = UnistylesRuntime.getTheme();

  function renderTextWithLinks(
    text: string,
    linkMap?: { [key: string]: string }
  ): React.ReactNode[] {
    if (!linkMap) return [text];

    // Sort phrases by length to match longer phrases first
    const phrases = Object.keys(linkMap).sort((a, b) => b.length - a.length);

    let remainingText = text;

    const elements: React.ReactNode[] = [];

    let idx = 0;

    while (remainingText.length > 0) {
      let matched = false;

      for (const phrase of phrases) {
        if (remainingText.startsWith(phrase)) {
          elements.push(
            <FoldText
              key={idx++}
              type={"body-sm-bold"}
              style={{ textDecorationLine: "underline" }}
              onPress={() =>
                linkMap[phrase] && Linking.openURL(linkMap[phrase])
              }
            >
              {phrase}
            </FoldText>
          );

          remainingText = remainingText.slice(phrase.length);

          matched = true;

          break;
        }
      }
      if (!matched) {
        // Find next phrase or end of string
        const nextPhraseIdx = phrases
          .map((p) => remainingText.indexOf(p))
          .filter((i) => i >= 0)
          .sort((a, b) => a - b)[0];

        const cutIdx =
          nextPhraseIdx !== undefined ? nextPhraseIdx : remainingText.length;

        elements.push(remainingText.slice(0, cutIdx));

        remainingText = remainingText.slice(cutIdx);
      }
    }
    return elements;
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#F5EFD6",
        borderRadius: 12,
        backgroundColor: tokens.layer.background,
        width: "100%",
      }}
    >
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option.id);

        return (
          <FoldPressable
            key={option.id}
            onPress={() => onToggle(option.id)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 16,
              flexDirection: "row",
              gap: 12,
              borderBottomWidth: index === options.length - 1 ? 0 : 1,
              borderBottomColor: "#F5EFD6",
            }}
          >
            <View>
              {isSelected ? (
                // TODO: Fix color codes.
                <CheckCircleIcon fill={"#1F845A"} width={20} height={20} />
              ) : (
                <CircleIcon fill={"#738496"} width={20} height={20} />
              )}
            </View>

            <FoldText type={"body-sm"} style={{ flex: 1, flexWrap: "wrap" }}>
              {renderTextWithLinks(option.text, option.linkMap)}

              {option.linkText && (
                <>
                  {" "}
                  <FoldText
                    type={"body-sm-bold"}
                    style={{ textDecorationLine: "underline" }}
                    onPress={() =>
                      option?.linkUrl && Linking.openURL(option.linkUrl)
                    }
                  >
                    {option.linkText}
                  </FoldText>
                </>
              )}
            </FoldText>
          </FoldPressable>
        );
      })}
    </View>
  );
};
