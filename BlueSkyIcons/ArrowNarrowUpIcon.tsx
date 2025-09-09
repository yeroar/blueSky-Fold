import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowUpIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M11 20V6.414l-4.293 4.293a1 1 0 1 1-1.414-1.414l6-6 .076-.068a1 1 0 0 1 1.338.068l6 6 .068.076a1 1 0 0 1-1.406 1.406l-.076-.068L13 6.414V20a1 1 0 1 1-2 0" />
    </Svg>
  );
};
