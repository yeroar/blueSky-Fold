import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const SearchMdIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M18 11a7 7 0 1 0-2.137 5.032 1 1 0 0 1 .17-.169A6.98 6.98 0 0 0 18 11m2 0a8.96 8.96 0 0 1-1.97 5.616l3.677 3.677.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-3.677-3.677A9 9 0 1 1 20 11" />
    </Svg>
  );
};
